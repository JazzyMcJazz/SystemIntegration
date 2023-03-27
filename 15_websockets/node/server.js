import { WebSocketServer } from "ws";

const PORT = process.env.PORT || 8080;
const server = new WebSocketServer({ port: PORT });

server.on("connection", (socket) => {
    console.log("New connection. Total connections:", server.clients.size);
    socket.send("Hello from Server!");
    
    socket.on("message", (message) => {
        
        server.clients.forEach((client) => {
            if (client.readyState === WebSocketServer.OPEN) {
                client.send(message);
            }
        });
    });

    
});

server.on('close', () => {
    console.log('Server closed');
});