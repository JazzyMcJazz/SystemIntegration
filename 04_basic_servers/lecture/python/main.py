from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def _():
    return "<a href='/json'>json</a>"

@app.get("/newroute")
def _():
    return { "message": "Hello Again World" }
