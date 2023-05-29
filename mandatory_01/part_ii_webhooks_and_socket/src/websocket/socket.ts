import { Server, WebSocket } from 'ws';
import db from '../database/DatabaseGateway.js';
import * as hooks from '../webhooks/hooks.js';

enum MessageType {
    CHAT = 'chat',
    SYSTEM = 'system'
}

enum EventType {
    SET_USERNAME = 'set-username',
    MESSAGE = 'message',
    ERROR = 'error',
    CONFIRM_CONNECTION = 'confirm-connection',
    LOAD_MESSAGES = 'load-messages'
}

class Socket {
    private ws: Server<WebSocket>;
    private users: Set<string> = new Set();

    constructor(ws: Server<WebSocket>) {
        this.ws = ws;
        this.handle();
    }

    private handle() {
        this.ws.on('connection', async (socket) => {

            let username: string | undefined;
            
            socket.on('message', async (json: string) => {
                const { event, data } = JSON.parse(json);

                // If username is not set and event is not set-username, close connection
                if (event !== EventType.SET_USERNAME && !username) {
                    socket.close();
                    return;
                }

                // Handle events
                switch (event) {
                    case EventType.SET_USERNAME:
                        // Handle new user connection and set username
                        username = await this.onReceiveUser(socket, data);
                        break;

                    case EventType.MESSAGE:
                        // Save message to database
                        db.message.createMessage(data.message, username!);

                        // Prepare message object
                        const message = { event: EventType.MESSAGE, data: { type: MessageType.CHAT, username, message: data.message }};
                        
                        // Send message to all clients
                        this.ws.clients.forEach(function each(client) {
                            if (client.readyState === WebSocket.OPEN) {
                              client.send(JSON.stringify(message));
                            }
                          });
                          
                        // Trigger webhook
                        hooks.trigger(username!, data, 'message');
                        break;
                }
            });

            // On disconnect
            socket.on('close', () => {
                // Remove user from list of connected users
                this.users.delete(username!);

                // Send message to all clients
                this.ws.clients.forEach(client => {
                    if (client !== socket && client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({ event: EventType.MESSAGE, data: { type: MessageType.SYSTEM, username: "red", message: `User ${username} disconnected` } }));
                    }
                });
                
                // Trigger webhook
                hooks.trigger(username!, `User ${username} disconnected`, 'disconnect');
            });
        });
    }

    async onReceiveUser(socket: WebSocket, data: { username: string }) {
        const { username } = data;
        
        // Check if username is undefined and close connection if it is
        if (!username) {
            const data = { event: EventType.ERROR, data: 'Username is undefined' };
            socket.send(JSON.stringify(data));
            socket.close();
            return;
        }

        // Check if username is already taken and close connection if it is
        if (this.users.has(username)) {
            const data = { event: EventType.ERROR, data: 'Username is already taken' };
            socket.send(JSON.stringify(data));
            socket.close();
            return;
        }

        // Add username to list of connected users
        this.users.add(username);

        // Send confirmation to client
        let confirm = { event: EventType.CONFIRM_CONNECTION, data: 'You are connected to the server' };
        socket.send(JSON.stringify(confirm));

        // Send all chat messages in database to client
        let load = { event: EventType.LOAD_MESSAGES, data: await db.message.getMessages() };
        socket.send(JSON.stringify(load));

        // Send message to all other clients that a new user has connected
        let message = { event: EventType.MESSAGE, data: { type: MessageType.SYSTEM, username: "green", message: `User ${username} connected` } };
        this.ws.clients.forEach(function each(client) {
            if (client !== socket && client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify(message));
            }
          });

        // Trigger webhook
        hooks.trigger(username, `User ${username} connected`, 'connection');

        return username;
    }
}

export default Socket;
