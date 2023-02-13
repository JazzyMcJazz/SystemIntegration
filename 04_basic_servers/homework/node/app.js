import express from 'express';
import router from './router/router.js';


const app = express();

app.use(router);

const PORT = 8000;
app.listen(PORT, () => {
    console.log('Server listening on port', PORT);
});