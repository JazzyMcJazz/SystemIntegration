from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from parsers import JsonParser, XmlParser, CsvParser, YamlParser, TxtParser, PickleParser

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
            <a href='/pickle' style="color: skyblue"><h2>PICKLE</h2></a>
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

@app.get("/pickle")
def pickle():
    PickleParser.serialize()
    return PickleParser.deserialize()
