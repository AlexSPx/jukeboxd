use std::{io, env};

use actix_cors::Cors;
use actix_web::{HttpServer, App, middleware::Logger, web, http::header};
use diesel::{r2d2::ConnectionManager, PgConnection};
use dotenv::dotenv;

mod repositories;

#[actix_web::main]
async fn main() -> io::Result<()> {
    dotenv().ok();

    // env::set_var("RUST_LOG", "actix_web=debug,actix_server=info");
    env_logger::init();

     
    let database_url = env::var("DATABASE_URL")
        .expect("DATABASE_URL must be set");
    let manager = ConnectionManager::<PgConnection>::new(database_url);
    let pool = r2d2::Pool::builder()
        .build(manager)
        .expect("Failed to create pool");


    HttpServer::new(move || {
        App::new()
        .wrap(
            Cors::default()
                .allowed_origin("http://localhost:3000")
                .allowed_methods(vec!["GET", "POST"])
                .allowed_headers(vec![header::AUTHORIZATION, header::ACCEPT])
                .allowed_header(header::CONTENT_TYPE)
                .supports_credentials()
                .max_age(3600),
        )
        .wrap(Logger::default())
        .app_data(web::Data::new(pool.clone()))
        .service(web::scope("/api")
            .service(repositories::auth_repository::routes::login)
        )
    })
    .bind(("0.0.0.0", 8000))?
    .run()
    .await
}
