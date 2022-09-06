use serde::{Serialize, Deserialize};


#[derive(Debug, Serialize, Deserialize)]
pub struct SpotifyError {
    pub error: SpotifyErrorBody
}

#[derive(Debug, Serialize, Deserialize)]
pub struct SpotifyErrorBody {
    pub status: i32,
    pub message: String
}