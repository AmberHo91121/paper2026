from pydantic import BaseModel
from typing import Optional
from enum import Enum


class EventType(str, Enum):
    MEETING = "開會"
    VISIT = "參訪"
    SPORTS = "打球"
    DINING = "吃飯"
    ACTIVITY = "活動"
    OTHER = "其他"


DURATION_HOURS = {
    EventType.MEETING: 2,
    EventType.VISIT: 3,
    EventType.SPORTS: 3,
    EventType.DINING: 3,
    EventType.ACTIVITY: 3,
    EventType.OTHER: 2,
}


class ParsedEvent(BaseModel):
    event_id: str
    event_type: EventType
    title: str
    date: str        # MM/DD
    start_time: str  # HH:MM
    end_time: str    # HH:MM
    location: Optional[str] = None
    note: Optional[str] = None
    source: str      # "Line" | "Slack" | "GChat"
    raw_message: str


class UserState(BaseModel):
    state: str       # "idle" | "editing_time" | "editing_location" | "editing_note"
    event_id: Optional[str] = None


# In-memory store（個人工具用 dict 夠了）
pending_events: dict[str, ParsedEvent] = {}
user_states: dict[str, UserState] = {}
