use r2d2::Pool;
use r2d2_sqlite::{rusqlite::params, SqliteConnectionManager};

use crate::DbPool;

pub async fn init_db() -> Result<DbPool, Box<dyn std::error::Error>> {
    let manager = SqliteConnectionManager::file("movies.db");
    let pool = Pool::new(manager)?;
    let conn = pool.get()?;
    conn.execute("CREATE TABLE IF NOT EXISTS movies (id TEXT PRIMARY KEY, title TEXT NOT NULL, rating REAL NOT NULL, plot TEXT NOT NULL)", params![])?;
    Ok(pool)
}

pub async fn save_to_db(pool: DbPool, id: String, title: String, plot: String, rating: f32) -> Result<(), Box<dyn std::error::Error>> {
    let conn = pool.get()?;
    let mut stmt = conn.prepare("INSERT INTO movies (id, title, plot, rating) VALUES (?1, ?2, ?3, ?4)")?;
    match stmt.execute(params![id, title, plot, rating]) {
        _ => Ok(())
    }
}

pub struct Movie {
    pub id: String,
    pub title: String,
    pub rating: f64,
    pub plot: String,
}
pub async fn find_movies(pool: DbPool) -> Result<Vec<Movie>, Box<dyn std::error::Error>> {
    let conn = pool.get()?;
    let mut stmt = conn.prepare("SELECT * FROM movies")?;
    
    let movies_iter = stmt.query_map(params![], |row| {
        let id: String = row.get(0).unwrap();
        let title: String = row.get(1).unwrap();
        let rating: f64 = row.get(2).unwrap();
        let plot: String = row.get(3).unwrap();
        Ok((id, title, rating, plot))
    })?;

    
    let mut movies = vec![];
    for movie in movies_iter {
        let (id, title, rating, plot) = movie?;
        movies.push(Movie {
            id,
            title,
            rating,
            plot,
        });
    }

    Ok(movies)
}

pub fn get_database_filesize() -> Result<u64, Box<dyn std::error::Error>> {
    let metadata = std::fs::metadata("movies.db")?;
    Ok(metadata.len())
}

pub fn reset_db() -> Result<(), Box<dyn std::error::Error>> {
    std::fs::remove_file("movies.db")?;
    Ok(())
}