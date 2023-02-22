from fastapi import FastAPI, Response, UploadFile
from fastapi.responses import HTMLResponse
from parsers import JsonParser, XmlParser, CsvParser, YamlParser, TxtParser, Marshal
import requests
import pkg_resources

app = FastAPI()

@app.get("/")
def home():
    return HTMLResponse(pkg_resources.resource_string(__name__, 'public/index.html'))

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

@app.post("/upload")
async def upload(file: UploadFile):
    match file.content_type:
        case "application/json":
            return JsonParser.parseUpload(file.file)
        case "text/xml":
            return XmlParser.parseUpload(file.file)
        case "text/csv":
            return CsvParser.parseUpload(file.file)
        case "application/x-yaml":
            return YamlParser.parseUpload(file.file)
        case "text/plain":
            return await TxtParser.parseUpload(file)
        case _:
            return "Unsupported file type"


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
