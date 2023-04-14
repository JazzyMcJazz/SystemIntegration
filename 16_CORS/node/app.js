import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/timestamp', (req, res) => {
    res.send(new Date());
});

app.post('/webhook', (req, res) => {
    console.log('Webhook called');
    console.log(req.body);
    res.send();
});


app.listen(3002, () => {
    console.log('Server started on port 3002');
});