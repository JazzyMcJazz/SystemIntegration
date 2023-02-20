from fastapi import FastAPI
from datetime import datetime
from requests import get as fetch

app = FastAPI()

@app.get("/date")
def get_date():
    return { "FastAPIDate": datetime.now() }

@app.get("/dateFromExpress")
def get_date_from_express():
    response = fetch("http://127.0.0.1:3000/date")
    return response.json()
