from linebot.v3.messaging import (
    ApiClient,
    Configuration,
    MessagingApi,
    PushMessageRequest,
    ReplyMessageRequest,
    TextMessage,
    FlexMessage,
    QuickReply,
    QuickReplyItem,
    PostbackAction,
)

from config import LINE_CHANNEL_ACCESS_TOKEN, LINE_USER_ID
from models.event import ParsedEvent

SOURCE_EMOJI = {
    "Line": "💬",
    "Slack": "💼",
    "GChat": "🔵",
}


def _get_api() -> MessagingApi:
    config = Configuration(access_token=LINE_CHANNEL_ACCESS_TOKEN)
    return MessagingApi(ApiClient(config))


def _build_confirmation_flex(event: ParsedEvent) -> dict:
    emoji = SOURCE_EMOJI.get(event.source, "📲")
    location_text = event.location or "（未提及）"
    note_text = event.note or "（未提及）"
    truncated = event.raw_message[:80] + ("..." if len(event.raw_message) > 80 else "")

    return {
        "type": "bubble",
        "size": "mega",
        "header": {
            "type": "box",
            "layout": "vertical",
            "paddingAll": "16px",
            "backgroundColor": "#2D6BFF",
            "contents": [
                {
                    "type": "text",
                    "text": "🔔 偵測到活動",
                    "weight": "bold",
                    "size": "lg",
                    "color": "#ffffff",
                },
                {
                    "type": "text",
                    "text": f"來源：{emoji} {event.source}",
                    "size": "sm",
                    "color": "#ffffffaa",
                    "margin": "xs",
                },
            ],
        },
        "body": {
            "type": "box",
            "layout": "vertical",
            "spacing": "md",
            "paddingAll": "16px",
            "contents": [
                _info_row("📅", f"{event.date}  {event.start_time} ~ {event.end_time}"),
                _info_row("📍", location_text),
                _info_row("📝", note_text),
                {"type": "separator", "margin": "md"},
                {
                    "type": "text",
                    "text": f'「{truncated}」',
                    "size": "xs",
                    "color": "#aaaaaa",
                    "wrap": True,
                    "margin": "md",
                },
            ],
        },
        "footer": {
            "type": "box",
            "layout": "horizontal",
            "spacing": "sm",
            "paddingAll": "12px",
            "contents": [
                _button("✅ 建立", f"action=create&id={event.event_id}", "primary"),
                _button("✏️ 修改", f"action=edit&id={event.event_id}", "secondary"),
                _button("❌ 略過", f"action=skip&id={event.event_id}", "secondary"),
            ],
        },
    }


def _info_row(icon: str, text: str) -> dict:
    return {
        "type": "box",
        "layout": "horizontal",
        "spacing": "sm",
        "contents": [
            {"type": "text", "text": icon, "size": "sm", "flex": 0},
            {"type": "text", "text": text, "size": "sm", "flex": 1, "wrap": True, "margin": "sm"},
        ],
    }


def _button(label: str, data: str, style: str) -> dict:
    return {
        "type": "button",
        "style": style,
        "action": {"type": "postback", "label": label, "data": data},
        "height": "sm",
    }


def push_confirmation(event: ParsedEvent) -> None:
    api = _get_api()
    flex = _build_confirmation_flex(event)
    api.push_message(
        PushMessageRequest(
            to=LINE_USER_ID,
            messages=[FlexMessage(alt_text="偵測到活動，請確認", contents=flex)],
        )
    )


def push_edit_menu(reply_token: str, event_id: str) -> None:
    api = _get_api()
    quick_reply = QuickReply(
        items=[
            QuickReplyItem(action=PostbackAction(label="📅 時間", data=f"action=edit_time&id={event_id}")),
            QuickReplyItem(action=PostbackAction(label="📍 地點", data=f"action=edit_location&id={event_id}")),
            QuickReplyItem(action=PostbackAction(label="📝 備註", data=f"action=edit_note&id={event_id}")),
        ]
    )
    api.reply_message(
        ReplyMessageRequest(
            reply_token=reply_token,
            messages=[TextMessage(text="請選擇要修改的欄位：", quick_reply=quick_reply)],
        )
    )


def push_ask_field(reply_token: str, field: str, current: str, hint: str) -> None:
    api = _get_api()
    api.reply_message(
        ReplyMessageRequest(
            reply_token=reply_token,
            messages=[TextMessage(text=f"目前{field}：{current}\n\n請輸入新的{field}：\n{hint}")],
        )
    )


def push_success(reply_token: str, event: ParsedEvent, calendar_link: str) -> None:
    api = _get_api()
    lines = [
        "✅ 活動已建立！",
        "",
        f"📅 {event.date}  {event.start_time} ~ {event.end_time}",
        f"📍 {event.location or '（無地點）'}",
        f"📝 {event.note or '（無備註）'}",
        "",
        f"🔗 {calendar_link}",
    ]
    api.reply_message(
        ReplyMessageRequest(
            reply_token=reply_token,
            messages=[TextMessage(text="\n".join(lines))],
        )
    )


def push_skipped(reply_token: str) -> None:
    api = _get_api()
    api.reply_message(
        ReplyMessageRequest(
            reply_token=reply_token,
            messages=[TextMessage(text="已略過，不建立活動。")],
        )
    )


def push_text(reply_token: str, text: str) -> None:
    api = _get_api()
    api.reply_message(
        ReplyMessageRequest(
            reply_token=reply_token,
            messages=[TextMessage(text=text)],
        )
    )


def repush_confirmation(event: ParsedEvent, reply_token: str) -> None:
    """修改後重新推送確認卡片（用 reply）"""
    api = _get_api()
    flex = _build_confirmation_flex(event)
    api.reply_message(
        ReplyMessageRequest(
            reply_token=reply_token,
            messages=[FlexMessage(alt_text="請確認修改後的活動", contents=flex)],
        )
    )
