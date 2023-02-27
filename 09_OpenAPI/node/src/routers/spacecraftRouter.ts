import { Router } from 'express';

/** 
 *  @openapi 
 *  tags: 
 *    - name: Spacecrafts 
 *      description: Spacecraft API
 * 
 * 
 * components:
 *   schemas:
 *       SpacecraftId:
 *           description: The unique identifier of a spacecraft
 *           type: string
 *       Spacecraft:
 *           type: object
 *           required:
 *               - id
 *               - name
 *               - type
 *           properties:
 *               id:
 *                   $ref: "#/components/schemas/SpacecraftId"
 *               name:
 *                   type: string
 *               type:
 *                   type: string
 *                   enum:
 *                       - capsule
 *                       - probe
 *                       - satellite
 *                       - spaceplane
 *                       - station
 *               description:
 *                   type: string
 *       Error:
 *           type: object
 *           required:
 *               - message
 *           properties:
 *               message:
 *                   description: A human readable error message
 *                   type: string
 *   securitySchemes:
 *       ApiKey:
 *           type: apiKey
 *           in: header
 *           name: X-Api-Key
 * security:
 *   - ApiKey: []
*/

const router = Router();

const spacecrafts = [
    {
        id: 1,
        name: 'Apollo 11',
        type: 'capsule',
    },
    {
        id: 2,
        name: 'Apollo 13',
        type: 'capsule',
    },
];

/**
 * @openapi
 * /api/spacecrafts/{spacecraftId}:
 *    get:
 *      tags: [Spacecrafts]
 *      summary: Read a spacecraft
 *      responses:
 *          200:
 *              description: The spacecraft corresponding to the provided `spacecraftId`
 *              
 *          404:
 *              description: No spacecraft found for the provided `spacecraftId`
 *             
 *          500:
 *              description: Unexpected error
*/
router.get('/api/spacecrafts/:SpacecraftId', (req, res) => {
    const spacecraftId = parseInt(req.params.SpacecraftId);
    const spacecraft = spacecrafts.find((spacecraft) => spacecraft.id === spacecraftId);
    if (spacecraft) {
        res.json({ data: spacecraft });
    } else {
        res.status(404).json({ error: 'Spacecraft not found' });
    }
});

/**
 * @openapi
 * /api/spacecrafts:
 *    post:
 *     tags: [Spacecrafts]
 *     summary: Create a new spacecraft
 *     requestBody:
 *       description: The spacecraft to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *           $ref: '#/components/schemas/Spacecraft'
 *    responses:
 *      200:
 *        description: The spacecraft that was created
 *   
 *      500:
 *        description: Unexpected error
 */
router.post('/api/spacecrafts', (req, res) => {
    const spacecraft = req.body;
    spacecrafts.push(spacecraft);
    res.json({ data: spacecraft });
});



export default router;