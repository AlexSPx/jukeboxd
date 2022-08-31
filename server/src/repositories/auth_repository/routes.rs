use actix_web::{get, HttpResponse, web};


#[get("/login/{access_token}")]
pub async fn login(aceess_token: web::Path<String>) -> HttpResponse {

    // let auth_endpoint = "https://accounts.spotify.com/authorize";
    // let redirect_url = "http://localhost:3000/";
    // let client_id = "1834a70791cd43419a8432fb6d243dbf";
    // let client_secret = "6e99c24d51b64d0594c1e14c729ac5cf";

    match reqwest::get("https://api.spotify.com/v1/me").await {
        Ok(mut response) => {
            if response.status() == 401 {
                println!("401 response");
            } 
        }
        Err(err) => println!("{}", err)
    };



    HttpResponse::Ok().body("data")
}