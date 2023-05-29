import { Payload, Triggers } from '@prisma/client';
import db from '../database/DatabaseGateway.js';

export const trigger = async (username: string, message: string, trigger: 'message' | 'connection' | 'disconnect') => {
    const webhooks = await db.webhook.getWebhooksByTrigger(trigger);

    for (const webhook of webhooks) {
        send(webhook.id, webhook.url, webhook.payload!, username, message);
    }
}

export const manualTrigger = async (id: number) => {
    const webhook = await db.webhook.getWebhookById(id);

    if (webhook) {
        await send(webhook.id, webhook.url, webhook.payload!, 'server', 'Webhook triggered manually');
    }
}

const send = async (id: number, url: string, payload: Payload, username: string, message: string) => {
    const data: { [key: string]: any } = {};

    if (payload.username) data.username = username;
    if (payload.message) data.message = message;
    if (payload.timestamp) data.timestamp = new Date().toISOString();
    if (payload.history) data.history = await db.message.getMessages();
    
    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)

    }).then(async (res) => {
        res.ok
            ? await db.webhook.updateStatus(id, 'success')
            : await db.webhook.updateStatus(id, 'failure');

    }).catch(async () => {
        await db.webhook.updateStatus(id, 'failure');
    });
    
}
