from fastapi import FastAPI, Response
from fastapi.responses import HTMLResponse
from parsers import JsonParser, XmlParser, CsvParser, YamlParser, TxtParser, Marshal
import requests

app = FastAPI()

@app.get("/")
def home():
    html = """
    <html>
        <head>
            <title>Data Parser</title>
        </head>
        <body style="background-color: black; color: white; text-align: center">
            <h1>Select data type to parse:</h1>
            <a href='/json' style="color: skyblue"><h2>JSON</h2></a>
            <a href='/xml' style="color: skyblue"><h2>XML</h2></a>
            <a href='/csv' style="color: skyblue"><h2>CSV</h2></a>
            <a href='/yaml' style="color: skyblue"><h2>YAML</h2></a>
            <a href='/txt' style="color: skyblue"><h2>TXT</h2></a>
            <a href='/pickle' style="color: skyblue"><h2>MARSHAL JSON WITH PICKLE</h2></a>
            <a href='/pickle/deserialize' style="color: skyblue"><h2>DESERIALIZE PICKLED JSON</h2></a>

        </body>
    </html>
    """
    return HTMLResponse(content=html, status_code=200)

@app.get("/json")
def json():
    return JsonParser.parse()

@app.get("/xml")
def xml():
    return XmlParser.parse()

@app.get("/csv")
def csv():
    return CsvParser.parse()

@app.get("/yaml")
def yaml():
    return YamlParser.parse()

@app.get("/txt")
def txt():
    return TxtParser.parse()

# Serialize / Marshal with Pickle
@app.get("/pickle")
def pickle():
    data = JsonParser.parse()
    serialized = Marshal.serialize(data)
    
    return Response(
        serialized, 
        media_type="application/octet-stream",
    )

@app.get("/pickle/deserialize")
def pickle_deserialize():
    response = requests.get("http://localhost:8000/pickle")
    deserialized = Marshal.deserialize(response.content)
    return deserialized
