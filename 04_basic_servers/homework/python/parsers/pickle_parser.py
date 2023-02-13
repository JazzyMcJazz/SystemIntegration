import pickle

class Marshal:


    def __init__(self) -> None:
        pass

    def serialize(data):
        return pickle.dumps(data)

    def deserialize(data):
        return pickle.loads(data)
