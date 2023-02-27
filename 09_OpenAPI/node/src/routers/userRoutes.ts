import { Router } from 'express';

const router = Router();

const users = [
    {
        id: 1,
        name: 'John Doe',
    },
    {
        id: 2,
        name: 'Jane Doe',
    },
];

/**
 * @openapi
 * /api/users:
 *   get:
 *    description: Get all users.
 *    responses:
 *     200:
 *      description: Returns all users.
 */
router.get('/api/users', (req, res) => {
    res.json({ data: users });
});

/**
 * @openapi
 * /api/users:
 *   post:
 *    description: Create a new user.
 *    responses:
 *     200:
 *      description: Returns the user that was created.
 */
router.post('/api/users', (req, res) => {
    const user = req.body;
    users.push(user);
    res.json({ data: user });
});


export default router;