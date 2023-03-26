import { PrismaClient, Triggers, Webhook, Payload } from "@prisma/client";

class WebhookRepo {
    private db: PrismaClient;

    constructor(db: PrismaClient) {
        this.db = db;
    }

    async createWebhook(webhook: Webhook, triggers: Triggers, payload: Payload) {
        return await this.db.webhook.create({
            data: {
                url: webhook.url,
                triggers: {
                    create: {
                        message: triggers.message,
                        connection: triggers.connection,
                        disconnect: triggers.disconnect,
                    }
                },
                payload: {
                    create: {
                        username: payload.username,
                        message: payload.message,
                        timestamp: payload.timestamp,
                        history: payload.history,

                    }
                }
            },
        });
    }

    async getWebhooks() {
        return await this.db.webhook.findMany({
            where: { deletedAt: null },
            include: { payload: true, triggers: true } 
        });
    }

    async getWebhookById(id: number) {
        return await this.db.webhook.findUnique({
            where: { id },
            include: { payload: true, triggers: true }
        }).then((webhook) => webhook?.deletedAt ? null : webhook);
    }

    async getWebhooksByTrigger(trigger: 'message' | 'connection' | 'disconnect') {
        return await this.db.webhook.findMany({
            where: { 
                deletedAt: null,
                triggers: { [trigger]: true } 
            },
            include: { payload: true }
        });
    }

    async updateWebhook(id: number, webhook: Webhook, triggers: Triggers, payload: Payload) {
        return await this.db.webhook.update({
            where: { id },
            data: {
                url: webhook.url,
                status: 'pending',
                triggers: {
                    update: {
                        message: triggers.message,
                        connection: triggers.connection,
                        disconnect: triggers.disconnect,
                    }
                },
                payload: {
                    update: {
                        username: payload.username,
                        message: payload.message,
                        timestamp: payload.timestamp,
                        history: payload.history,
                    }
                }
            },
        });
    }

    async deleteWebhook(id: number) {
        return await this.db.webhook.update({
            where: { id },
            data: { deletedAt: new Date() }
        });
    }

    async updateStatus(id: number, status: 'pending' | 'success' | 'failure') {
        return await this.db.webhook.update({
            where: { id },
            data: { status }
        });
    }
    
}

export default WebhookRepo;