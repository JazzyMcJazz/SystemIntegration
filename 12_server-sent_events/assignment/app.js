import express from 'express';
import path from 'path';

const app = express();

const subscribers = [];
app.get('/subscribe', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
    });

    // on connection
    subscribers.push(res);
    console.log('\nClient connected');
    console.log('Current Subscribers: ', subscribers.length);
    subscribers.forEach((r) => {
        r.write('data: ' + JSON.stringify({ subscribers: subscribers.length }) + '\n\n');
    });

    // on close
    req.on('close', () => {
        subscribers.splice(subscribers.indexOf(res), 1);
        console.log('\nClient disconnected');
        console.log('Current Subscribers: ', subscribers.length);
        subscribers.forEach((r) => {
            r.write('data: ' + JSON.stringify({ subscribers: subscribers.length }) + '\n\n');
        });
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});