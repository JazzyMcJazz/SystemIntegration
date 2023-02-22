import { Router } from "express";
import multer from "multer";
import * as Parser from '../parse.js';

const router = Router();

router.get('/', (req, res) => {
    res.sendFile('index.html', { root: './public' });
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

// Upload

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), (req, res) => {
    let data;
    switch (req.file.mimetype) {
        case 'application/json':
            data = Parser.parseJSON(req.file.buffer);
            break;
        case 'text/xml':
            data = Parser.parseXML(req.file.buffer);
            break;
        case 'text/csv':
            data = Parser.parseCSV(req.file.buffer);
            break;
        case 'application/x-yaml':
            data = Parser.parseYAML(req.file.buffer);
            break;
        case 'text/plain':
            data = Parser.parseTXT(req.file.buffer);
            break;
        default:
            res.status(400).send('Invalid file type');
            return;
    }
    
    res.send(data);
});

export default router;