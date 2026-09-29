import hashlib
import hmac
import base64

from fastapi import APIRouter, Request, HTTPException
from linebot.v3 import WebhookParser
from linebot.v3.webhooks import PostbackEvent, MessageEvent, TextMessageContent

from config import LINE_CHANNEL_SECRET
from models.event import pending_events, user_states, UserState
from services.calendar_service import create_event
from services.line_service import (
    push_edit_menu,
    push_ask_field,
    push_success,
    push_skipped,
    push_text,
    repush_confirmation,
)

router = APIRouter()
parser = WebhookParser(LINE_CHANNEL_SECRET)

FIELD_LABELS = {
    "editing_time": "時間",
    "editing_location": "地點",
    "editing_note": "備註",
}

FIELD_HINTS = {
    "editing_time": "格式：MM/DD HH:MM ~ MM/DD HH:MM\n例：07/10 14:00 ~ 16:00",
    "editing_location": "例：台北辦公室、Zoom",
    "editing_note": "例：與客戶討論 Q3 計畫",
}


def _verify_signature(body: bytes, signature: str) -> bool:
    hash_val = hmac.new(
        LINE_CHANNEL_SECRET.encode("utf-8"), body, hashlib.sha256
    ).digest()
    return base64.b64encode(hash_val).decode() == signature


@router.post("/line/webhook")
async def line_webhook(request: Request):
    body = await request.body()
    signature = request.headers.get("X-Line-Signature", "")

    if not _verify_signature(body, signature):
        raise HTTPException(status_code=400, detail="Invalid signature")

    try:
        events = parser.parse(body.decode("utf-8"), signature)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid webhook")

    for ev in events:
        if isinstance(ev, PostbackEvent):
            _handle_postback(ev)
        elif isinstance(ev, MessageEvent) and isinstance(ev.message, TextMessageContent):
            _handle_message(ev)

    return {"status": "ok"}


def _handle_postback(ev: PostbackEvent):
    data = dict(item.split("=") for item in ev.postback.data.split("&"))
    action = data.get("action")
    event_id = data.get("id")
    reply_token = ev.reply_token
    user_id = ev.source.user_id

    if action == "create":
        event = pending_events.get(event_id)
        if not event:
            push_text(reply_token, "找不到活動，可能已過期。")
            return
        try:
            link = create_event(event)
            push_success(reply_token, event, link)
            del pending_events[event_id]
        except Exception as e:
            push_text(reply_token, f"建立失敗：{e}")

    elif action == "skip":
        push_skipped(reply_token)
        pending_events.pop(event_id, None)

    elif action == "edit":
        push_edit_menu(reply_token, event_id)

    elif action == "edit_time":
        event = pending_events.get(event_id)
        if not event:
            push_text(reply_token, "找不到活動，可能已過期。")
            return
        current = f"{event.date}  {event.start_time} ~ {event.end_time}"
        user_states[user_id] = UserState(state="editing_time", event_id=event_id)
        push_ask_field(reply_token, "時間", current, FIELD_HINTS["editing_time"])

    elif action == "edit_location":
        event = pending_events.get(event_id)
        if not event:
            push_text(reply_token, "找不到活動，可能已過期。")
            return
        user_states[user_id] = UserState(state="editing_location", event_id=event_id)
        push_ask_field(reply_token, "地點", event.location or "（未設定）", FIELD_HINTS["editing_location"])

    elif action == "edit_note":
        event = pending_events.get(event_id)
        if not event:
            push_text(reply_token, "找不到活動，可能已過期。")
            return
        user_states[user_id] = UserState(state="editing_note", event_id=event_id)
        push_ask_field(reply_token, "備註", event.note or "（未設定）", FIELD_HINTS["editing_note"])


def _handle_message(ev: MessageEvent):
    user_id = ev.source.user_id
    text = ev.message.text.strip()
    reply_token = ev.reply_token

    print(f"[LINE_USER_ID] {user_id}")  # 第一次收到訊息時複製這個值填入 .env

    state = user_states.get(user_id)
    if not state or state.state == "idle":
        return

    event = pending_events.get(state.event_id)
    if not event:
        push_text(reply_token, "找不到活動，可能已過期。")
        user_states.pop(user_id, None)
        return

    if state.state == "editing_time":
        try:
            _apply_time_edit(event, text)
            user_states[user_id] = UserState(state="idle")
            repush_confirmation(event, reply_token)
        except ValueError:
            push_text(reply_token, "格式錯誤，請輸入：MM/DD HH:MM ~ MM/DD HH:MM\n例：07/10 14:00 ~ 16:00")

    elif state.state == "editing_location":
        event.location = text
        user_states[user_id] = UserState(state="idle")
        repush_confirmation(event, reply_token)

    elif state.state == "editing_note":
        event.note = text
        user_states[user_id] = UserState(state="idle")
        repush_confirmation(event, reply_token)


def _apply_time_edit(event, text: str):
    """
    接受格式：MM/DD HH:MM ~ MM/DD HH:MM
    或簡略：HH:MM ~ HH:MM（日期不變）
    """
    text = text.replace("～", "~").replace("–", "~").replace("-", "~")

    if "~" not in text:
        raise ValueError("missing tilde")

    parts = [p.strip() for p in text.split("~")]
    if len(parts) != 2:
        raise ValueError("bad format")

    start_raw, end_raw = parts

    def parse_part(raw: str):
        if "/" in raw:
            date_part, time_part = raw.strip().split(" ", 1)
            return date_part.strip(), time_part.strip()
        else:
            return None, raw.strip()

    start_date, start_time = parse_part(start_raw)
    end_date, end_time = parse_part(end_raw)

    if start_date:
        event.date = start_date
    if start_time:
        event.start_time = start_time
    if end_time:
        event.end_time = end_time
