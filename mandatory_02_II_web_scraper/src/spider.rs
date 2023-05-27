use scraper::{Html, Selector};
use std::collections::HashSet;

use crate::{DbPool, database};

pub struct Spider {
    pub home_page: String,
    pub seed_page: String,
    pub disallowed: Option<Vec<String>>,
    pub pool: DbPool
}

impl Spider {
    pub fn new(
        home_page: String, 
        seed_page: String, 
        pool: DbPool
    ) -> Self {
        Self {
            home_page,
            seed_page,
            disallowed: None,
            pool
        }
    }

    pub async fn crawl(&mut self) -> Result<(), Box<dyn std::error::Error>> {
        let disallowed = get_disallowed(self.home_page.clone()).await?;
        self.disallowed = Some(disallowed);
        
        let mut visited_urls: HashSet<String> = HashSet::new();
        let mut queue: Vec<String> = Vec::new();
        
        queue.push(self.seed_page.clone());

        while let Some(url) = queue.pop() {
            let id = url.split("/").collect::<Vec<_>>()[2];

            // check if database is full
            let db_size = database::get_database_filesize()?;
            if db_size > 100_000_000 { // 100MB
                println!("Database is full. Stopping crawler...");
                break;
            }

            // check if url has been visited
            if visited_urls.contains(&url) {
                print!("Visited: {} - ", visited_urls.len());
                print!("Queue: {} - ", queue.len());
                println!("Skipping..");
                continue;
            }

            // add url to visited
            visited_urls.insert(url.clone());

            // sleep 500ms
            tokio::time::sleep(std::time::Duration::from_millis(500)).await;
            
            print!("Visited: {} - ", visited_urls.len());
            print!("Queue: {} - ", queue.len());
            println!("Database size: {}MB", format!("{:.2}", db_size as f32 / 1024.0 / 1024.0));

            // get page and parse
            let url = format!("{}{}", self.home_page, url);
            let page = get_page(&url).await?;
            let (title, plot, rating, links) = parse_page(page);
            
            // add links to queue
            for link in links {
                if !self.disallowed.as_ref().unwrap().contains(&link) {
                    queue.push(link);
                }
            }

            // skip saving if title, plot or rating is empty
            if title.is_empty() || plot.is_empty() || rating == -1.0 {
                continue;
            }

            database::save_to_db(self.pool.clone(), id.to_string(), title, plot, rating).await?;
        }

        Ok(())
    }
}

async fn get_page(url: &str) -> Result<String, Box<dyn std::error::Error>> {
    let resp = reqwest::get(url)
        .await?
        .text()
        .await?;
    Ok(resp)
}

fn parse_page(html: String) -> (String, String, f32, Vec<String>) {
    let document = Html::parse_document(&html);

    let links = filter_links(&document);
    let title = get_title(&document); 
    let plot = get_plot(&document); 
    let rating = get_rating(&document); 

    (title, plot, rating, links)
}

fn get_title(document: &Html) -> String {
    let title_selector = Selector::parse("[data-testid=\"hero__pageTitle\"]").unwrap();
    
    let mut title: String = String::new();
    for title_element in document.select(&title_selector) {
        title = match title_element.text().collect::<Vec<_>>().len() {
            0 => String::new(),
            _ => title_element.text().collect::<Vec<_>>()[0].to_string()
        };
    };
    title
}

fn get_plot(document: &Html) -> String {
    // get plot
    let plot_selector = Selector::parse("[data-testid=\"plot-xs_to_m\"]").unwrap();
    
    let mut plot = String::new();
    for plot_element in document.select(&plot_selector) {
        plot = match plot_element.text().collect::<Vec<_>>().len() {
            0 => String::new(),
            _ => plot_element.text().collect::<Vec<_>>()[0].to_string()
        };
    };

    plot
}

fn get_rating(document: &Html) -> f32 {
    let rating_selector = Selector::parse("[data-testid=\"hero-rating-bar__aggregate-rating__score\"]").unwrap();
    let mut rating: f32 = -1.0;
    for rating_element in document.select(&rating_selector) {
        rating = match rating_element.text().collect::<Vec<_>>().len() {
            0 => -1.0,
            _ => rating_element.text().collect::<Vec<_>>()[0].parse::<f32>().unwrap()
        };
    }
    rating
}

fn filter_links(document: &Html) -> Vec<String> {
    let selector = Selector::parse("a").unwrap();
    let mut links: Vec<String> = Vec::new();

    for element in document.select(&selector) {
        let link = element.value().attr("href").unwrap();

        let fragments = link.split("/").collect::<Vec<_>>();

        // check if link is a movie title page
        let condition = {
            link.starts_with("/title") &&
            fragments.len() == 4 &&
            fragments[3].starts_with("?")
        };

        if !condition {
            continue;
        }
        
        // add link to links vector (ex. /title/tt1234567)
        links.push(fragments[0..3].join("/"));
    }
    
    links
}

async fn get_disallowed(mut url: String) -> Result<Vec<String>, Box<dyn std::error::Error>> {
    url.push_str("/robots.txt");
    let resp = reqwest::get(url)
        .await?
        .text()
        .await?;

    let mut disallowed: Vec<String> = Vec::new();
    let mut lines = resp.lines();
    while let Some(line) = lines.next() {
        if line.starts_with("Disallow") {
            let disallowed_path = line.split(":")
                .collect::<Vec<_>>()[1]
                .trim()
                .to_string();

            disallowed.push(disallowed_path);
        }
    }

    Ok(disallowed)
}