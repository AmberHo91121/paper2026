import json
import uuid
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo

from google import genai

from config import GEMINI_API_KEY
from models.event import EventType, DURATION_HOURS, ParsedEvent

TAIPEI_TZ = ZoneInfo("Asia/Taipei")

KEYWORDS = {
    "開會", "會議", "meeting", "Meeting", "MEETING",
    "參訪", "打球", "吃飯", "午餐", "晚餐", "dinner", "lunch",
    "活動", "event", "約見面", "見面",
}

TIME_SIGNALS = {
    "點", "時", "am", "pm", "AM", "PM",
    "早上", "上午", "下午", "晚上", "中午",
    "明天", "後天", "今天", "這週", "下週",
    "週一", "週二", "週三", "週四", "週五", "週六", "週日",
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
    "/",
}

WEEKDAY_MAP = ["週一", "週二", "週三", "週四", "週五", "週六", "週日"]


def _has_keyword(message: str) -> bool:
    return any(kw in message for kw in KEYWORDS)


def _has_time_signal(message: str) -> bool:
    return any(ts in message for ts in TIME_SIGNALS)


def quick_check(message: str) -> bool:
    return _has_keyword(message) and _has_time_signal(message)


def _build_date_context() -> dict:
    now = datetime.now(TAIPEI_TZ)
    tomorrow = now + timedelta(days=1)
    day_after = now + timedelta(days=2)

    def fmt(d: datetime) -> str:
        return d.strftime("%m/%d")

    return {
        "today": fmt(now),
        "today_weekday": WEEKDAY_MAP[now.weekday()],
        "tomorrow": fmt(tomorrow),
        "tomorrow_weekday": WEEKDAY_MAP[tomorrow.weekday()],
        "day_after_tomorrow": fmt(day_after),
        "year": now.year,
    }


PARSE_PROMPT = """\
你是活動資訊萃取助手。今天是 {today}（{today_weekday}）、{year} 年。

從以下訊息萃取活動資訊。若訊息沒有明確活動關鍵字＋時間，回傳 JSON null。

訊息：{message}

日期對照：
- 今天 = {today}
- 明天 = {tomorrow}（{tomorrow_weekday}）
- 後天 = {day_after_tomorrow}

時間規則：
- 下午/PM：+12（下午2點=14:00）
- 早上/上午：原時間
- 晚上：18:00以後
- 無日期時：取最近未來時間點

活動類型對照：
- "開會" → 開會/會議/meeting
- "參訪" → 參訪/拜訪
- "打球" → 打球/運動/球賽
- "吃飯" → 吃飯/午餐/晚餐/dinner/lunch/約吃
- "活動" → 活動/event/派對
- "其他" → 無法歸類

只回傳以下 JSON，不要加任何說明文字：
{{
  "event_type": "開會"|"參訪"|"打球"|"吃飯"|"活動"|"其他",
  "title": "活動標題（10字以內）",
  "date": "MM/DD",
  "start_time": "HH:MM",
  "location": "地點或 null",
  "note": "備註（與誰/目的）或 null"
}}

若無法識別則回傳：null\
"""


def parse_message(message: str, source: str) -> ParsedEvent | None:
    if not quick_check(message):
        return None

    ctx = _build_date_context()
    prompt = PARSE_PROMPT.format(message=message, **ctx)

    client = genai.Client(api_key=GEMINI_API_KEY)
    response = client.models.generate_content(
        model="gemini-1.5-flash",
        contents=prompt,
    )

    raw = response.text.strip()

    if raw == "null" or not raw:
        return None

    try:
        data = json.loads(raw)
    except json.JSONDecodeError:
        return None

    if not data:
        return None

    event_type = EventType(data["event_type"])
    start_h, start_m = map(int, data["start_time"].split(":"))
    duration = DURATION_HOURS[event_type]

    end_minutes = start_h * 60 + start_m + duration * 60
    end_h = (end_minutes // 60) % 24
    end_m = end_minutes % 60

    return ParsedEvent(
        event_id=str(uuid.uuid4()),
        event_type=event_type,
        title=data["title"],
        date=data["date"],
        start_time=data["start_time"],
        end_time=f"{end_h:02d}:{end_m:02d}",
        location=data.get("location"),
        note=data.get("note"),
        source=source,
        raw_message=message,
    )
