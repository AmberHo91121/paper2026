"""
執行一次以完成 Google Calendar OAuth 授權。
需要先把 credentials.json 放在同目錄。
"""
from google_auth_oauthlib.flow import InstalledAppFlow
from config import GOOGLE_CREDENTIALS_FILE, GOOGLE_TOKEN_FILE

SCOPES = ["https://www.googleapis.com/auth/calendar"]

flow = InstalledAppFlow.from_client_secrets_file(GOOGLE_CREDENTIALS_FILE, SCOPES)
creds = flow.run_local_server(port=0)

with open(GOOGLE_TOKEN_FILE, "w") as f:
    f.write(creds.to_json())

print(f"✅ 授權完成，token 已儲存至 {GOOGLE_TOKEN_FILE}")
