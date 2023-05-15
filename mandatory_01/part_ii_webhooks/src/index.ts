import http from 'http';
import express from 'express';
import { WebSocketServer } from 'ws';
import cors from 'cors';
import path from 'path';
import Socket from './websocket/socket.js';
import webhookRouter from './router/webhooks.js';

const app = express();
const server = http.createServer(app);
const wsServer = new WebSocketServer({ server });
new Socket(wsServer);

app.use(express.json());
app.use(cors());
app.use('/api', webhookRouter);

app.use(express.static(path.join(process.cwd(), 'public', 'build')));
    
app.post('/api/consume-webhook', (req, res) => {
    console.log('Body:', req.body);
    res.send();
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});