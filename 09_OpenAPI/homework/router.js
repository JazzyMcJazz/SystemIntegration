import { Router } from 'express';

const router = Router();

/**
 * @openapi
 * /account:
 *   post:
 *     summary: Create a new account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserRequest'
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Conflict
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *     tags:
 *       - Account
 */
router.post('/account', async (req, res) => {
    // business logic here
    
    res.status(201).send();
});

/**
 * @openapi
 * /account/login:
 *   post:
 *     summary: Log in to an account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUserRequest'
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *     tags:
 *       - Account
 */
router.post('/account/login', async (req, res) => {
    // business logic here

    res.status(200).send();
});

/**
 * @openapi
 * /account:
 *   get:
 *     summary: Get account information. Requires authentication.
 *     description: Get information about the authenticated account.
 *     security:
 *       - Authorization: []
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *     tags:
 *       - Account
 */
router.get('/account', async (req, res) => {
    // business logic here

    res.status(200).send();
});

/**
 * @openapi
 * /account/update:
 *   put:
 *     summary: Update Account. Requires authentication.
 *     description: Update account with new name, email, or password. Each field is optional, but newPassword requires oldPassword.
 *     security:
 *       - Authorization: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserRequest'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Conflict
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *     tags:
 *       - Account
 */
router.put('/account/update', async (req, res) => {
    // business logic here

    res.status(200).send();
});

/**
 * @openapi
 * /account/logout:
 *   post:
 *     summary: Kill Session. Requires authentication.
 *     description: Kill user session by deleting the session from the database.
 *     security:
 *       - Authorization: []
 *     responses:
 *       204:
 *         description: No Content
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 code:
 *                   type: integer
 *     tags:
 *       - Account
 */
router.post('/account/logout', async (req, res) => {
    // business logic here

    res.status(204).send();
});

/**
 * @openapi
 * /account:
 *   delete:
 *     summary: Delete Account. Requires authentication.
 *     description: Delete user account from the database.
 *     security:
 *       - Authorization: []
 *     responses:
 *       204:
 *         description: No Content
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *     tags:
 *       - Account
 */
router.delete('/account', async (req, res) => {
    // business logic here

    res.status(204).send();
});

export default router;