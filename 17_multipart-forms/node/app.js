import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';

const app = express();
const storage = multer.diskStorage({ 
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        const filenameParts = file.originalname.split('.');
        if (filenameParts.length <= 1) {
            cb(new Error('File has no extension: ' + file.originalname));
        }
        
        const extension = filenameParts.pop();
        const originalFilename = filenameParts.join('.')
            .replaceAll(/[^a-zA-Z0-9_.- ]/g, ''); // Sanitize filename
        const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9);
        const filename = uniqueSuffix + '___' + originalFilename + '.' + extension;
        
        cb(null, filename);
    },
});
const upload = multer({ storage });

app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.post('/form', (req, res) => {
    delete req.body.password;
    res.send({ data: req.body });
});

app.post('/upload', upload.single('file'), (req, res) => {
    res.sendFile(path.join(process.cwd(), req.file.path));
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});