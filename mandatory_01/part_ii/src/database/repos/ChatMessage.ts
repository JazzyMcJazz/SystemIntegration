import { PrismaClient } from "@prisma/client";

class ChatMessage {
    db: PrismaClient;

    constructor(db: PrismaClient) {
        this.db = db;
    }

    async createMessage(message: string, username: string) {
        return await this.db.chatMessage.create({
            data: {
                message,
                username,
            }
        });
    }

    async getMessages() {
        return await this.db.chatMessage.findMany({
            orderBy: {
                createdAt: "asc"
            }
        });
    }
}

export default ChatMessage;