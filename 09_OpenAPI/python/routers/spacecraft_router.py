from fastapi import APIRouter, Query
from typing import Union
from pydantic import BaseModel

router = APIRouter()

spacecrafts = [
    {"id": 1, "Name": "Voyager 1", "Type": "Probe"},
    {"id": 2, "Name": "Voyager 2", "Type": "Probe"},
    {"id": 3, "Name": "Cassini", "Type": "Probe"},
    {"id": 4, "Name": "Pioneer 10", "Type": "Probe"},
    {"id": 5, "Name": "Pioneer 11", "Type": "Probe"},
    {"id": 6, "Name": "Viking 1", "Type": "Probe"},
]

class Spacecraft(BaseModel):
    id: int
    name: str
    type: str

@router.get("/spacecrafts/{spacecraft_id}")
def get_spacecraft(spacecraft_id: int, show_id: Union[str, None] = Query("Default", min_length=3, max_length=50)):
    for spacecraft in spacecrafts:
        if spacecraft["id"] == spacecraft_id:
            if show_id == "true":
                return spacecraft
            copy = spacecraft.copy()
            del copy["id"]
            return copy
    return {"Error": "Spacecraft not found"}

@router.post("/spacerafts")
def add_spacecraft(spacecraft: Spacecraft):
    spacecrafts.append(spacecraft)
    return spacecraft