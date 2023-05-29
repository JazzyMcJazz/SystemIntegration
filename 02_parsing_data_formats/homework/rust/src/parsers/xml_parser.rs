use std::fs::File;
use std::io::Read;
use serde_derive::Deserialize;
use serde_xml_rs::from_reader;
use crate::models::Team;

#[derive(Debug, Deserialize)]
pub struct Roster {
    #[serde(rename = "player")]
    pub players: Vec<String>,
}

#[derive(Debug, Deserialize)]
pub struct TeamIntermediate {
    pub name: String,
    pub rank: u16,
    pub roster: Roster,
    pub coach: String,
}

#[derive(Debug, Deserialize)]
pub struct Teams {
    #[serde(rename = "team")]
    pub teams: Vec<TeamIntermediate>,
}

pub fn parse(file_path: String) -> Vec<Team> {
    let mut file = File::open(file_path).expect("File not found");
    let mut contents = String::new();
    file.read_to_string(&mut contents).expect("Error reading file");
    
    let teams: Teams = from_reader(contents.as_bytes()).expect("Error parsing XML");

    // Transform the intermediate structs to the desired structs
    let teams: Vec<Team> = teams
        .teams
        .into_iter()
        .map(|team| Team {
            name: team.name,
            rank: team.rank,
            roster: team.roster.players,
            coach: team.coach,
        })
        .collect();
    
    teams
}