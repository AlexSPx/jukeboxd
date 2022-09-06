use actix_web::{get, HttpResponse, web, cookie::Cookie, http::header::ContentType};

use crate::models::{spotify_models::SpotifyMe, errors::SpotifyError};


#[get("/login/{access_token}")]
pub async fn login(access_token: web::Path<String>) -> HttpResponse {

    // let auth_endpoint = "https://accounts.spotify.com/authorize";
    // let redirect_url = "http://localhost:3000/";
    // let client_id = "1834a70791cd43419a8432fb6d243dbf";
    // let client_secret = "6e99c24d51b64d0594c1e14c729ac5cf";

    let client = reqwest::Client::new();
    
    let res = client.get("https://api.spotify.com/v1/me")
        .header(reqwest::header::AUTHORIZATION, format!("Bearer {}", &access_token.as_str()))
        .send()
        .await
        .unwrap();

    match res.status() {
        reqwest::StatusCode::OK => {
            let user =  res.json::<SpotifyMe>().await.unwrap();
            
            let auth_cookie = Cookie::build("access_token", &*access_token)
                .secure(true)
                .http_only(true)
                .path("/")
                .finish();
            
            HttpResponse::Ok()
                .cookie(auth_cookie)
                .content_type(ContentType::json())    
                .json(user)
                
        }
        _ => {
            let err = res.json::<SpotifyError>().await.unwrap();
            
            HttpResponse::Unauthorized()
                .content_type(ContentType::json())
                .json(err)
        }
    }
}