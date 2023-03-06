import express from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/webhook', (req, res) => {
    console.log('Webhook received');
    const payload = JSON.parse(req.body.payload);
    console.log(payload);
    res.send();
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});