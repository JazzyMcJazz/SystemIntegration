import WebSocket from 'ws';

const websocketClient = new WebSocket('ws://localhost:8080');

websocketClient.on('open', () => {
    console.log('Connected to websocket server');

    websocketClient.send('Hello from client!');
});