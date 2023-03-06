from fastapi import FastAPI, Request, Response
import json

app = FastAPI()

@app.post("/webhook")
async def webhook(request: Request, response: Response):
    if request.headers.get("content-type") != "application/x-www-form-urlencoded":
        return Response(status_code=400)
    
    form_data = await request.form()
    payload = form_data.get("payload")
    print(payload)
    return Response(status_code=200)
    