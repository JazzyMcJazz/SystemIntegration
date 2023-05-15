mod spider;
mod database;
mod html;

use r2d2::Pool;
use r2d2_sqlite::SqliteConnectionManager;
use spider::Spider;
use std::env;
use webbrowser;

type DbPool = Pool<SqliteConnectionManager>;

const HOME_PAGE: &str = "https://www.imdb.com";
const SEED_PATH: &str = "/title/tt6791350";

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let args: Vec<String> = env::args().collect();

    let pool: DbPool = database::init_db().await?;

    if args.len() < 2 {
        print_help();
    }
    
    match args[1].as_str() {
        "crawl" => {
            println!("Crawling...");
            let mut spider = Spider::new(
                HOME_PAGE.to_string(),
                SEED_PATH.to_string(),
                pool
            );

            spider.crawl().await?;
        },
        
        "html" => {
            let mut sort_by = "";
            if args.len() > 2 {
                sort_by = args[2].as_str();
                if sort_by != "title" && sort_by != "rating" {
                    println!("Invalid sort_by argument. Only 'title' and 'rating' are valid.");
                    return Ok(());
                }
            }

            let movies = database::find_movies(pool.clone()).await?;
            html::generate_html(movies, sort_by);    
            webbrowser::open("output/movies1.html")?;
        },

        "reset" => {
            database::reset_db()?;
        },

        _ => {
            print_help();
        }
    }
    
    Ok(())    
}

// Valid args: crawl, generate_html
fn print_help() {
    println!("Usage: <command> <url>");
    println!("Commands:");
    println!("    crawl: Start the crawler");
    println!("    html: generate html from the database");
    println!("    reset: delete the database");
}

