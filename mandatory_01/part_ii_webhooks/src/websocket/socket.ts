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

                if (event !== EventType.SET_USERNAME && !username) {
                    socket.close();
                    return;
                }

                switch (event) {
                    case EventType.SET_USERNAME:
                        username = await this.onReceiveUser(socket, data);
                        break;
                    case EventType.MESSAGE:
                        db.message.createMessage(data.message, username!);
                        const message = { event: EventType.MESSAGE, data: { type: MessageType.CHAT, username, message: data.message }};
                        this.ws.clients.forEach(function each(client) {
                            if (client.readyState === WebSocket.OPEN) {
                              client.send(JSON.stringify(message));
                            }
                          });
                        hooks.trigger(username!, data, 'message');
                        break;

                }
            });

            // On disconnect
            socket.on('close', () => {
                this.users.delete(username!);
                this.ws.clients.forEach(client => {
                    if (client !== socket && client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({ event: EventType.MESSAGE, data: { type: MessageType.SYSTEM, username: "red", message: `User ${username} disconnected` } }));
                    }
                });
                
                hooks.trigger(username!, `User ${username} disconnected`, 'disconnect');
            });
        });
    }

    async onReceiveUser(socket: WebSocket, data: { username: string }) {
        const { username } = data;
        
        if (!username) {
            const data = { event: EventType.ERROR, data: 'Username is undefined' };
            socket.send(JSON.stringify(data));
            socket.close();
            return;
        }

        if (this.users.has(username)) {
            const data = { event: EventType.ERROR, data: 'Username is already taken' };
            socket.send(JSON.stringify(data));
            socket.close();
            return;
        }

        this.users.add(username);

        // On connection
        let confirm = { event: EventType.CONFIRM_CONNECTION, data: 'You are connected to the server' };
        socket.send(JSON.stringify(confirm));

        let load = { event: EventType.LOAD_MESSAGES, data: await db.message.getMessages() };
        socket.send(JSON.stringify(load));

        let message = { event: EventType.MESSAGE, data: { type: MessageType.SYSTEM, username: "green", message: `User ${username} connected` } };
        this.ws.clients.forEach(function each(client) {
            if (client !== socket && client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify(message));
            }
          });

        hooks.trigger(username, `User ${username} connected`, 'connection');
        return username;
    }
}

export default Socket;
