# Movie Scraper

This project scrapes movies from IMDB. It is written in Rust. 

Because the front page of IMDB does not contain direct links to title pages (when crawling) this crawler starts out on the title page for Guardians of the Galaxy Vol. III.

The crawler is configured to only visit movie title pages and should never visit the same title more than once.

## Setup

**Requirements**: 
 - You must have Rust installed to compile this project as no executable binary is supplied via version control.

## Running the projects

The program takes one of three commands:
- `crawl`
    - Starts the spider.
- `html`
    - Generates an html page from the database and opens it in the default browser.
    - This command can take one of two sub commands to sort movies:
        - `title`
        - `rating`
- `reset`
    - Deletes the SQLite database file.

### Example:
```shell
cargo run -- crawl
cargo run -- html title
cargo run -- reset
```
