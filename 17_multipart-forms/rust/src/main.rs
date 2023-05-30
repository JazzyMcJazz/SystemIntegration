use actix_web::{get, post, App, HttpServer, HttpResponse};
use actix_files as a_fs;
use actix_multipart::{
    form::{
        tempfile::TempFile,
        MultipartForm,
    },  
};
use std::fs;
use uuid;

#[derive(Debug, MultipartForm)]
struct UploadForm {
    #[multipart(rename = "file")]
    file: TempFile,
}

#[post("/upload")]
async fn upload_file(MultipartForm(form): MultipartForm<UploadForm>) -> HttpResponse {

    // Get the file from the form
    let file = form.file;

    // Get the extension
    let mime = file.content_type.clone().expect("Mime type missing");
    let extension = mime.subtype().as_str();
    
    // Generate a random filename
    let filename = uuid::Uuid::new_v4().to_string();

    // Save the file to the upload directory
    let path = format!("./upload/{}.{}", filename, extension);
    file.file.persist(path).unwrap();

    // redirect 
    HttpResponse::Found()
        .append_header(("Location", "/uploads"))
        .finish()
}

#[get("/")]
async fn index() -> HttpResponse {
    let html = r#"
        <!doctype html>
        <html>
            <head>
                <title>Upload file</title>
            </head>
            <body>
                <a href="/uploads">Uploads</a><br/><br/><br/><br/>
                <h1>Upload file</h1>
                <form action="/upload" method="post" enctype="multipart/form-data">
                    <input type="file" name="file" />
                    <input type="submit" value="Upload" />
                </form>
            </body>
        </html>
    "#;
    HttpResponse::Ok().body(html)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    fs::create_dir_all("./upload").unwrap();

    // Start the HTTP server
    HttpServer::new(move || {
        // Routes
        App::new()
            .service(a_fs::Files::new("/uploads", "./upload").show_files_listing())
            .service(index)
            .service(upload_file)
    })
    .bind("0.0.0.0:3000")?
    .run()
    .await
}