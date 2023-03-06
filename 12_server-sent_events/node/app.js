import express from 'express';
import path from 'path';

const app = express();

app.get('/sync-time', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });

    setInterval(() => sendTime(res), 1000);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public/index.html'));
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});


function sendTime(res) {
    const time = new Date()
    res.write(`data: ${JSON.stringify(time)}\n\n`);
}