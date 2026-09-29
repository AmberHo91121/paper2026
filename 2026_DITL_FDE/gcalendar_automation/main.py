from fastapi import FastAPI
from routes.notification_webhook import router as notify_router
from routes.line_webhook import router as line_router

app = FastAPI(title="Calendar Automation")

app.include_router(notify_router)
app.include_router(line_router)


@app.get("/health")
async def health():
    return {"status": "ok"}
