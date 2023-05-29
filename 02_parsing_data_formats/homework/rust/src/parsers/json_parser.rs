use std::fs::File;
use std::io::Read;
use serde_json;

use models::Team;

use crate::models;

pub fn parse(file_path: String) -> Vec<Team> {
    let mut file = File::open(file_path).expect("File not found");
    let mut contents = String::new();
    file.read_to_string(&mut contents).expect("Error reading file");

    let teams: Vec<Team> = match serde_json::from_str(&contents) {
        Ok(teams) => teams,
        _ => panic!("Error parsing JSON"),
    };
    
    teams
} 