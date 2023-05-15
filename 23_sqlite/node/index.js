import db from './database/connection.js';

db.exec("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT)");

db.run("INSERT INTO users (name, email) VALUES (?, ?)", ["John Doe", "john@doe.com"]);
db.run("INSERT INTO users (name, email) VALUES (?, ?)", ["Jane Doe", "jane@doe.com"]);
db.run("INSERT INTO users (name, email) VALUES (?, ?)", ["Bob the Conquerer", "bob@conquerer.com"]);

const users = await db.all("SELECT * FROM users");
console.log(users);