from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from sse_starlette.sse import EventSourceResponse
from datetime import datetime
import asyncio

templates = Jinja2Templates(directory="templates")

app = FastAPI()

@app.get("/")
async def root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/sse")
async def sse(request: Request):
    def new_message():
        yield "Hello World!"
    async def event_generator():
        while True:
            if await request.is_disconnected():
                break

            if new_message():
                yield {
                    "event": "new_message",
                    "id": "message_id",
                    "retry": 8000,
                    "data": datetime.now()
                }

            await asyncio.sleep(0.01)
            

    return EventSourceResponse(event_generator())
