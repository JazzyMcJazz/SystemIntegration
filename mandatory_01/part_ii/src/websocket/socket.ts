import { Server } from 'socket.io';
import db from '../database/DatabaseGateway.js';
import * as hooks from '../webhooks/hooks.js';

class Socket {
    private users: Set<string> = new Set();

    constructor(io: Server) {
        io.on('connection', async (socket) => {
            const username = socket.handshake.query.username as string;
            try {
                if (!username) throw new Error('Username is not defined');
                if (this.users.has(username)) throw new Error('Username is already taken') 
                this.users.add(username);
            } catch {
                socket.emit('error', 'Username is already taken');
                socket.disconnect();
                return;
            }   

            // On connection
            socket.emit('confirm-connection', 'You are connected to the server');
            socket.emit('load-messages', await db.message.getMessages());
            io.emit('message', { type: "system", username: "green", message: `User ${username} connected` })
            hooks.trigger(username, `User ${username} connected`, 'connection');

            // On message
            socket.on('message', (message: string) => {
                db.message.createMessage(message, username);
                io.emit('message', { username, message });
                hooks.trigger(username, message, 'message');
            });

            // On disconnect
            socket.on('disconnect', () => {
                this.users.delete(username);
                io.emit('message', { type: "system", username: "red", message: `User ${username} disconnected` })
                hooks.trigger(username, `User ${username} disconnected`, 'disconnect');
            });
        });
    }
}

export default Socket;
