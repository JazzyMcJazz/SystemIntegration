use std::fs::File;
use std::io::Read;
use serde_yaml;
use serde_derive::Deserialize;
use models::Team;

use crate::models;

#[derive(Debug, Deserialize)]
struct Teams {
    pub teams: Vec<TeamWrapper>,
}

#[derive(Debug, Deserialize)]
struct TeamWrapper {
    pub team: Team,
}

pub fn parse(file_path: String) -> Vec<Team> {
    let mut file = File::open(file_path).expect("File not found");
    let mut contents = String::new();
    file.read_to_string(&mut contents).expect("Error reading file");
    
    let teams: Teams = serde_yaml::from_str(&contents).expect("Error parsing YAML");
    let teams: Vec<Team> = teams.teams.into_iter().map(|wrapper| wrapper.team).collect();
    teams
} 