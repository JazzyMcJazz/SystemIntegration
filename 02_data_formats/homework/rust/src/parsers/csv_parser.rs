use models::Team;

use crate::models;

pub fn parse(file_path: String) -> Vec<Team> {
    let mut reader = csv::Reader::from_path(file_path).unwrap();
    
    let mut teams: Vec<Team> = Vec::new();
    for result in reader.records() {
        let record = result.unwrap();

        let mut team: Team = Default::default();
        team.name   = record.get(0).unwrap().to_string();
        team.rank   = record.get(1).unwrap().parse::<u16>().unwrap();
        team.roster = record.get(2).unwrap().split(",").map(|s| s.to_string()).collect();
        team.coach  = record.get(3).unwrap().to_string();

        teams.push(team);
    }

    teams
} 