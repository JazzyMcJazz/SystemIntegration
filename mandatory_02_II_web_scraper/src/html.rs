use std::fs;
use crate::database::Movie;

pub fn generate_html(mut movies: Vec<Movie>, sort_by: &str) {
    
    
    fs::create_dir_all("output").unwrap();

    // remove all files in the output folder
    for entry in fs::read_dir("output").unwrap() {
        let entry = entry.unwrap();
        fs::remove_file(entry.path()).unwrap();
    }

    match sort_by {
        "title" => movies.sort_by(|a, b| a.title.partial_cmp(&b.title).unwrap()),
        "rating" => movies.sort_by(|a, b| b.rating.partial_cmp(&a.rating).unwrap()),
        _ => {}
    }
    
    let max_pages = (movies.len() as f32 / 10.0).ceil() as u32;

    let mut i = 0;
    let mut current_page = 1;
    loop {
        let mut html = String::new();
        html.push_str(new_page(current_page, max_pages, i + 10 >= movies.len()).as_str());
        
        let j = {
            if i + 10 >= movies.len() {
                movies.len()
            } else {
                i + 10
            }
        };
        for movie in movies[i..j].iter() {
            html.push_str(generate_row(movie).as_str());
            i += 1;
        }

        html.push_str(close_page().as_str());

        fs::remove_file(format!("output/movies{}.html", current_page).as_str()).unwrap_or(());
        fs::write(format!("output/movies{}.html", current_page), html).unwrap();
        current_page += 1;

        if i >= movies.len() {
            break;
        }
    }
}

fn new_page(page_number: u32, max_pages: u32, last: bool) -> String {
    let mut html = String::new();
    html.push_str("<html><head><title>IMDB Movies</title></head><body>");
    
    html.push_str("<div class=\"pagination\">");
    
    let mut number_of_prev_links = 0;
    if page_number > 1 {
        html.push_str(&format!("<a class=\"nav\" href=\"movies{}.html\">Previous</a>", page_number - 1));
        html.push_str("<div class=\"pages\">");

        // generate links for the 5 previous pages
        let number_of_links = if max_pages - page_number > 5 { 5 } else { 10 - (max_pages - page_number) };
        let start = if page_number > number_of_links { page_number - number_of_links } else { 1 };
        number_of_prev_links = page_number - start;
        for i in start..page_number {
            html.push_str(&format!("<a class=\"page\" href=\"movies{}.html\">{}</a>", i, i));
        }
    } else {
        html.push_str(&format!("<div class=\"nav hidden\"></div>"));
        html.push_str("<div class=\"pages\">");
    }

    html.push_str(&format!("<span class=\"current page\">{}</span>", page_number)); // highlight the current page
    
    if !last {
        let number_of_next_links = 10 - number_of_prev_links;

        // generate links for the 5 next pages
        for i in page_number+1..=std::cmp::min(page_number+number_of_next_links, max_pages) {
            html.push_str(&format!("<a class=\"page\" href=\"movies{}.html\">{}</a>", i, i));
        }
        html.push_str("</div>");

        html.push_str(&format!("<a class=\"nav\" href=\"movies{}.html\">Next</a>", page_number + 1));
    } else {
        html.push_str("</div>");
        html.push_str(&format!("<div class=\"nav hidden\"></div>"));
    }
    
    html.push_str("</div>");

    html.push_str("<table><tr><th>Title</th><th>Rating</th><th>Plot</th></tr>");
    html
}

fn generate_row(movie: &Movie) -> String {
    let mut html = String::new();
    html.push_str("<tr>");
    html.push_str(&format!("<td>{}</td>", movie.title));
    html.push_str(&format!("<td>{}</td>", format!("{:.1}", movie.rating)));
    html.push_str(&format!("<td>{}</td>", movie.plot));
    html.push_str("</tr>");
    html
}

fn close_page() -> String {
    let mut html = String::new();
    html.push_str("</table>");
    html.push_str("<style>
        table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
        }
        
        td, th {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
        }

        tr {
            height: 54px;
        }
        
        tr:nth-child(even) {
            background-color: #dddddd;
        }

        .pagination {
            width: 100%;
            display: flex;
            justify-content: space-evenly;
            margin: 20px 0;
        }

        .pagination a {
            float: left;
            color: black;
            padding: 8px 16px;
            text-decoration: none;
            border: 1px solid #ddd;
        }

        .pagination .page {
            display: flex;
            justify-content: center;
            width: 1rem;
        }

        .pagination .nav {
            display: flex;
            justify-content: center;
            width: 5rem;
        }

        .pagination .hidden {
            padding: 8px 16px;
        }

        .prev {
            margin-right: 5px;
        }

        .current {
            color: black;
            float: left;
            padding: 8px 16px;
            text-decoration: none;
            border: 1px solid #ddd;
            background-color: #4CAF50;
        }

        .next {
            margin-left: 5px;
        }
        </style>
    ");
    html.push_str("</body></html>");
    html
}