import pickle

class PickleParser:


    def __init__(self) -> None:
        pass

    def serialize():
        data = [{"name":"Heroic","rank":1,"roster":["cadiaN","stavn","TeSeS","sjuush","jabbi"],"coach": "Xizt"},{"name": "Astralis","rank": 14,"roster": ["Xyp9x","gla1ve","device","blameF","Buzz"],"coach": "casle"}]
        
        with open("../data/teams.pkl", "wb") as f:
            pickle.dump(data, f)


    def deserialize():
        with open("../data/teams.pkl", "rb") as f:
            data = pickle.load(f)

        return data
