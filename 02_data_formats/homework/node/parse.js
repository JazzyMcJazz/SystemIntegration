import fs from 'fs';
import path from 'path';
import xml from 'xml-js';
import { parse } from 'csv-parse/sync';
import yaml from 'yaml'
import teamsJSON from '../data/teams.json' assert { type: 'json' };

// Parsed data
let parsedJSON;
let parsedXML;
let parsedCSV;
let parsedYAML;
let parsedTXT;

// Concurrent parsing
await Promise.all([parseJSON(), parseXML(), parseCSV(), parseYAML(), parseTXT()]);

// Testing the result
// Using the .json as the standard, the rest are equal. Must stringify for '===' operator to work
console.log('All parsed files are equal:',
    JSON.stringify(parsedJSON) === JSON.stringify(parsedXML)  &&
    JSON.stringify(parsedJSON) === JSON.stringify(parsedCSV)  &&
    JSON.stringify(parsedJSON) === JSON.stringify(parsedYAML) &&
    JSON.stringify(parsedJSON) === JSON.stringify(parsedTXT)
);



/* ==== Async functions for concurrency ==== */

async function parseJSON() {
    parsedJSON = teamsJSON; // redundant, I know. Just to keep the style.
}

async function parseXML() {
    const file = fs.readFileSync(path.resolve() + '/../data/teams.xml');
    const parsed = xml.xml2js(file, { compact: true }).teams.team;
    parsedXML = assimilateParsedXML(parsed);
} 

async function parseCSV() {
    const file = fs.readFileSync(path.resolve() + '/../data/teams.csv');
    const parsed = parse(file);
    parsedCSV = assimilateParsedCSV(parsed);
}

async function parseYAML() {
    const file = fs.readFileSync(path.resolve() + '/../data/teams.yaml');
    const parsed = yaml.parse(file.toString());
    parsedYAML = assimilateParsedYAML(parsed.teams);
}

async function parseTXT() {
    const file = fs.readFileSync(path.resolve() + '/../data/teams.txt');
    parsedTXT = assimilateTXT(file.toString());
}



/* ===== Assimilation functions ===== */

function assimilateParsedXML(teams) {
    const teamList = [];

    for (const team of teams) {
        const teamObj = {
            name: team.name._text,
            rank: Number(team.rank._text),
            roster: [],
            coach: team.coach._text
        };
        for (const player of team.roster.player) teamObj.roster.push(player._text);
        teamList.push(teamObj);
    }
    return teamList;
}

function assimilateParsedCSV(teams) {
    teams.shift(); // remove headers

    const teamList = [];
    for (const team of teams) {
        const teamObj = {
            name: team[0],
            rank: Number(team[1]),
            roster: [],
            coach: team[3]
        };
        for (const player of team[2].split(',')) teamObj.roster.push(player);
        teamList.push(teamObj);
    }
    return teamList;
}

function assimilateParsedYAML(teams) {
    const teamList = [];
    
    for (const team of teams) {
        teamList.push(team.team);
    }
    
    return teamList;
}

// parsing .txt manually cause there doesn't seem to be any libraries that parse .txt
// (this makes complete sense)
function assimilateTXT(teams) {
    const teamList = [];
    
    teams = teams.split('\n\n');
    for (const team of teams) {
        const teamObj = {};
        const props = team.split('\n').filter(prop => prop !== ''); 
        
        for (const prop of props) {
            const pair = prop.split('=');
            if (pair[1].includes(',')) pair[1] = pair[1].split(',');
            teamObj[pair[0]] = isNaN(pair[1]) ? pair[1] : Number(pair[1]);
            
        }
        teamList.push(teamObj);
    }
    return teamList;
}