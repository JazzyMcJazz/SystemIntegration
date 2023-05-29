/**
 * @openapi
 * components:
 *   securitySchemes:
 *     Authorization:
 *       type: apiKey
 *       in: header
 *       name: Authorization
 *       description: 'Bearer token and/or Session token, comma separated WITH space (important). <br>Example: "Bearer \<token\>, Session \<token\>"'
 *   parameters:
 *     API_KEY:
 *       name: API_KEY
 *       in: path
 *       description: Project API key
 *       required: true
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *     Project:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         account_id:
 *           type: string
 *         name:
 *           type: string
 *         created_at:
 *           type: string
 *         updated_at:
 *           type: string
 *         keystore:
 *           type: object
 *           properties:
 *             api_key:
 *               type: string
 *     Session:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         user_id:
 *           type: string
 *         created_at:
 *           type: string
 *         ip:
 *           type: string
 *         os:
 *           type: string
 *         browser:
 *           type: string
 *         location:
 *           type: string
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         code:
 *           type: integer
 *         message:
 *           type: string
 *     LoginUserRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *     CreateUserRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *     UpdateUserRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         oldPassword:
 *           type: string
 *         newPassword:
 *           type: string
 */