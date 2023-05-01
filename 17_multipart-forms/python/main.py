from fastapi import FastAPI, Form, File, UploadFile

app = FastAPI()

@app.post("/form")
def form_handler(username: str = Form(...), password: str = Form(...)): 
    print(username, password)
    return { "data": { "username": username } }

# @app.post("/upload")
# def file_handler(file: bytes = File(...)): 
#     print(file)
#     with open ("file", "wb") as f:
#         f.write(file)
#         f.close()
    
#     return { "data": "file uploaded" }

@app.post("/upload")
async def file_as_file_form_handler(file: UploadFile = File(...)):
    contents = await file.read()
    print(contents)
    return { "filename": file.filename, "size": len(contents) }