import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.get('/timestamp', (req, res) => {
    res.send(new Date());
});

app.listen(3002, () => {
    console.log('Server started on port 3000');
});
