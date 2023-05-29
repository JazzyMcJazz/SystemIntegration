import { Router } from 'express';
import db from '../database/DatabaseGateway.js';
import * as Hooks from '../webhooks/hooks.js';

const router = Router();

router.get('/webhooks', async (req, res) => {
    const webhooks = await db.webhook.getWebhooks();
    res.json(webhooks);
});

router.get('/webhooks/:id/trigger', async (req, res) => {
    const { id } = req.params;
    const webhook = await db.webhook.getWebhookById(Number(id));
    await Hooks.manualTrigger(Number(id));
    res.send();
});

router.post('/webhooks', async (req, res) => {
    const { 
        url, 
        triggers,
        payload
    } = req.body;

    // TODO: Validate input

    const webhook = await db.webhook.createWebhook(
        // @ts-ignore // Because Prisma types do not allow undefined values for non-nullable fields even if they have default values
        { url },
        {
            message: triggers.message,
            connection: triggers.connection,
            disconnect: triggers.disconnect,
        },
        {
            username: payload.username,
            message: payload.message,
            timestamp: payload.timestamp,
            history: payload.history,
        }
    );

    res.json(webhook);
});

router.put('/webhooks/:id', async (req, res) => {
    const { id } = req.params;
    const {
        url,
        triggers,
        payload
    } = req.body;

    const webhook = await db.webhook.updateWebhook(
        Number(id),
        // @ts-ignore // Because Prisma types do not allow undefined values for non-nullable fields even if they have default values
        { url },
        {
            message: triggers.message,
            connection: triggers.connection,
            disconnect: triggers.disconnect,
        },
        {
            username: payload.username,
            message: payload.message,
            timestamp: payload.timestamp,
            history: payload.history,
        }
    );

    res.json(webhook);
});

router.delete('/webhooks/:id', async (req, res) => {
    const { id } = req.params;
    const webhook = await db.webhook.deleteWebhook(Number(id));
    res.json(webhook);
});

export default router;