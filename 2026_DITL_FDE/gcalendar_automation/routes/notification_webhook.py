from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from config import WEBHOOK_SECRET
from models.event import pending_events
from services.parser import parse_message
from services.line_service import push_confirmation

router = APIRouter()


class NotificationPayload(BaseModel):
    message: str
    source: str   # "Line" | "Slack" | "GChat"
    secret: str


@router.post("/notify")
async def receive_notification(payload: NotificationPayload):
    if payload.secret != WEBHOOK_SECRET:
        raise HTTPException(status_code=401, detail="Unauthorized")

    source = payload.source if payload.source in {"Line", "Slack", "GChat"} else "Other"

    event = parse_message(payload.message, source)
    if not event:
        return {"status": "no_event_detected"}

    pending_events[event.event_id] = event
    push_confirmation(event)

    return {"status": "confirmation_sent", "event_id": event.event_id}
