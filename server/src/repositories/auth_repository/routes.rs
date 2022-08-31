use actix_web::{get, HttpResponse, web};


#[get("/login/{access_token}")]
pub async fn login(aceess_token: web::Path<String>) -> HttpResponse {

    // let auth_endpoint = "https://accounts.spotify.com/authorize";
    // let redirect_url = "http://localhost:3000/";
    // let client_id = "1834a70791cd43419a8432fb6d243dbf";
    // let client_secret = "6e99c24d51b64d0594c1e14c729ac5cf";


    HttpResponse::Ok().body("data")
}