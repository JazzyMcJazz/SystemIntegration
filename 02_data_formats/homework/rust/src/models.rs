use serde_derive::Deserialize;

#[derive(Debug, Deserialize, Default)]
pub struct Team {
    pub name: String,
    pub rank: u16,
    pub roster: Vec<String>,
    pub coach: String,
}