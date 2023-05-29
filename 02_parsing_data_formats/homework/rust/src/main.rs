mod parsers;
mod models;

use models::Team;

use parsers::{json_parser, csv_parser, xml_parser, yaml_parser, txt_parser};

fn main() {
    let json = json_parser::parse(String::from("../data/teams.json"));
    let csv  = csv_parser::parse(String::from("../data/teams.csv"));
    let xml  = xml_parser::parse(String::from("../data/teams.xml"));
    let yaml = yaml_parser::parse(String::from("../data/teams.yaml"));
    let txt  = txt_parser::parse(String::from("../data/teams.txt"));
    
    println!("JSON:");
    print(json);

    println!("CSV:");
    print(csv);

    println!("XML:");
    print(xml);

    println!("YAML:");
    print(yaml);

    println!("TXT:");
    print(txt);
}

fn print(teams: Vec<Team>) {
    println!("Teams: [");
    for team in teams {
        println!("    {{");
        println!("        Name: {},", team.name);
        println!("        Rank: {},", team.rank);
        println!("        Roster: [");
        for player in team.roster {
            println!("            {},", player);
        }
        println!("        ],");
        println!("        Coach: {},", team.coach);
        println!("    }},");
    }
    println!("]");
    println!("");
}
