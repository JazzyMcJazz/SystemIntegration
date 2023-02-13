import { Router } from "express";
import * as Parser from '../parse.js';

const router = Router();

const html = `
        <html>
            <head>
                <title>Data Parser</title>
            </head>
            <body style="background-color: black; color: white; text-align: center">
                <h1>Select data type to parse:</h1>
                <a href='/json' style="color: skyblue"><h2>JSON</h2></a>
                <a href='/xml' style="color: skyblue"><h2>XML</h2></a>
                <a href='/csv' style="color: skyblue"><h2>CSV</h2></a>
                <a href='/yaml' style="color: skyblue"><h2>YAML</h2></a>
                <a href='/txt' style="color: skyblue"><h2>TXT</h2></a>
            </body>
        </html>
    `;

router.get('/', (req, res) => {
    res.send(html);
});

router.get('/json', (req, res) => {
    const data = Parser.parseJSON();
    res.send(data);
});

router.get('/xml', (req, res) => {
    const data = Parser.parseXML();
    res.send(data);
});

router.get('/csv', (req, res) => {
    const data = Parser.parseCSV();
    res.send(data);
});

router.get('/yaml', (req, res) => {
    const data = Parser.parseYAML();
    res.send(data);
});

router.get('/txt', (req, res) => {
    const data = Parser.parseTXT();
    res.send(data);
});

export default router;