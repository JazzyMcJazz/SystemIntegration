import express from "express";
import Showdown from "showdown";
import fs from "fs";
import path from "path";

const converter = new Showdown.Converter();

const app = express();

app.get("/", (req, res) => {
    const doc = fs.readFileSync(path.join(path.resolve(), "./src/documentation/database.md"), "utf8");
    const style = `<style>${fs.readFileSync(path.join(path.resolve(), "./src/documentation/style.css"), "utf8")}</style>`;
    res.send(converter.makeHtml(doc + style));
});

app.get("/schema", (req, res) => {
    const doc = fs.readFileSync(path.join(path.resolve(), "./src/documentation/systint_mro_docs.html"), "utf8");
    res.send(doc);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
