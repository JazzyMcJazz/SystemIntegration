from fastapi import FastAPI
from routers import spacecraft_router

app = FastAPI()
app.include_router(spacecraft_router)

