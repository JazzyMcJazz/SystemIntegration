use actix_web::{get, post, web, App, Error, HttpServer, HttpResponse, Responder, Result};
use actix_files::Files;
use serde::{Serialize, Deserialize};
use reqwest::{Client, Error as ReqwestError};
use reqwest::multipart::Form;
use std::error::Error as StdError;
use std::fmt;


////////////////////
// API Endpoints //
///////////////////

#[get("/api/ping")]
async fn ping() -> impl Responder {
    HttpResponse::Ok().body("PONG")
}

#[post("/api/login")]
async fn login(user: web::Json<LoginRequest>) -> Result<HttpResponse> {
    
    match handle_login(user).await {
        Ok(data) => Ok(HttpResponse::Ok().json(data)),
        Err(error) => Err(Error::from(CustomError(error.to_string()))),
    }
}

#[post("/api/send-sms")]
async fn send_sms(data: web::Json<SmsRequest>) -> Result<HttpResponse> {

    match handle_send_sms(data).await {
        Ok(data) => Ok(HttpResponse::Ok().json(data)),
        Err(error) => Err(Error::from(CustomError(error.to_string()))),
    }
}

////////////////////
// Main Function //
///////////////////

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .service(ping)
            .service(login)
            .service(send_sms)
            .service(Files::new("/", "./public/build/").index_file("index.html"))
    })
    .bind(("localhost", 3000))?
    .run()
    .await
}

/////////////////////
// Data Structures //
/////////////////////

#[derive(Serialize, Deserialize)]
struct LoginResponse {
    user_api_key: String,
    user_verified_at: String,
}

#[derive(Deserialize)]
struct LoginRequest {
    email: String,
    password: String,
}

#[derive(Deserialize)]
struct SmsRequest {
    user_api_key: String,
    sms_message: String,
    sms_to_phone: String,
}

#[derive(Deserialize, Serialize)]
struct SmsResponse {
    info: String,
    sms_id: String,
}

/////////////////////
// Helper Methods //
////////////////////

async fn handle_login(data: web::Json<LoginRequest>) -> Result<LoginResponse, ReqwestError> {
    let data = Form::new()
        .text("user_email", data.email.clone())
        .text("user_password", data.password.clone());
    
    let client = Client::new();
    let response = client.post("https://fiotext.com/login")
        .multipart(data)
        .send()
        .await?;

    let data = response.json::<LoginResponse>().await?;
    Ok(data)
}

async fn handle_send_sms(data: web::Json<SmsRequest>) -> Result<SmsResponse, ReqwestError> {
    let data = Form::new()
        .text("user_api_key", data.user_api_key.clone())
        .text("sms_message", data.sms_message.clone())
        .text("sms_to_phone", data.sms_to_phone.clone());
    
    let client = Client::new();
    let response = client.post("https://fiotext.com/send-sms")
        .multipart(data)
        .send()
        .await?;

    let data = response.json::<SmsResponse>().await?;
    Ok(data)
}

/////////////////////
/// Error Handling //
/////////////////////

#[derive(Debug)]
struct CustomError(String);

impl fmt::Display for CustomError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}", self.0)
    }
}

impl StdError for CustomError {}

impl actix_web::error::ResponseError for CustomError {
    fn error_response(&self) -> actix_web::HttpResponse {
        HttpResponse::InternalServerError().json(self.0.clone())
    }
}
