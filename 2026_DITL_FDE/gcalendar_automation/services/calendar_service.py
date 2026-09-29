from datetime import datetime
from zoneinfo import ZoneInfo

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build

from config import (
    GOOGLE_CREDENTIALS_FILE,
    GOOGLE_TOKEN_FILE,
    GOOGLE_CALENDAR_ID,
)
from models.event import ParsedEvent

SCOPES = ["https://www.googleapis.com/auth/calendar"]
TAIPEI_TZ = ZoneInfo("Asia/Taipei")


def _get_service():
    import os

    creds = None
    if os.path.exists(GOOGLE_TOKEN_FILE):
        creds = Credentials.from_authorized_user_file(GOOGLE_TOKEN_FILE, SCOPES)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                GOOGLE_CREDENTIALS_FILE, SCOPES
            )
            creds = flow.run_local_server(port=0)
        with open(GOOGLE_TOKEN_FILE, "w") as f:
            f.write(creds.to_json())

    return build("calendar", "v3", credentials=creds)


def create_event(event: ParsedEvent) -> str:
    year = datetime.now(TAIPEI_TZ).year
    month, day = map(int, event.date.split("/"))
    s_h, s_m = map(int, event.start_time.split(":"))
    e_h, e_m = map(int, event.end_time.split(":"))

    start_dt = datetime(year, month, day, s_h, s_m, tzinfo=TAIPEI_TZ)
    end_dt = datetime(year, month, day, e_h, e_m, tzinfo=TAIPEI_TZ)

    description_parts = []
    if event.note:
        description_parts.append(event.note)
    description_parts.append(f"來源：{event.source}")
    description_parts.append(f"原始訊息：{event.raw_message}")

    body = {
        "summary": event.title,
        "location": event.location or "",
        "description": "\n".join(description_parts),
        "start": {
            "dateTime": start_dt.isoformat(),
            "timeZone": "Asia/Taipei",
        },
        "end": {
            "dateTime": end_dt.isoformat(),
            "timeZone": "Asia/Taipei",
        },
    }

    service = _get_service()
    created = service.events().insert(calendarId=GOOGLE_CALENDAR_ID, body=body).execute()
    return created.get("htmlLink", "")
