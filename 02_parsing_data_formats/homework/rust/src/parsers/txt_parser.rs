use std::fs::File;
use std::io::Read;
use models::Team;

use crate::models;

pub fn parse(file_path: String) -> Vec<Team> {
    let mut file = File::open(file_path).expect("File not found");
    let mut contents = String::new();
    file.read_to_string(&mut contents).expect("Error reading file");
    
    let teams = contents.split("\n\n\n").map(|team| {
        let mut team = team.split("\n");
        let name = &team.next().unwrap().to_string()
            .split("=").map(|s| s.to_string()).collect::<Vec<String>>()[1];
        let rank = &team.next().unwrap().to_string()
            .split("=").map(|s| s.to_string()).collect::<Vec<String>>()[1]
            .parse::<u16>().unwrap();
        let roster = &team.next().unwrap().to_string()
            .split("=").map(|s| s.to_string()).collect::<Vec<String>>()[1]
            .split(",").map(|s| s.to_string()).collect::<Vec<String>>();
        let coach = &team.next().unwrap().to_string()
            .split("=").map(|s| s.to_string()).collect::<Vec<String>>()[1];

        Team {
            name: name.to_string(),
            rank: *rank,
            roster: roster.to_vec(),
            coach: coach.to_string(),
        }
        
    }).collect::<Vec<Team>>();

    teams
} 