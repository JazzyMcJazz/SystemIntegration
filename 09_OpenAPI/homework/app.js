import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import router from './router.js';

const app = express();

app.use(express.json());
app.use(router);

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'User API',
        version: '1.0.0',
        description: 'A simple Express User API',
    },
};

const options = {
    swaggerDefinition,
    apis: ['./*.js'],
};

const openapiSpecification = swaggerJSDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});