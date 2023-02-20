import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send({virus: "this is a virus"});
});

app.get('/razbanana' , async (req, res) => {
    let response;
    let data;
    try {
        response = await fetch('https://9e74-195-249-146-101.eu.ngrok.io');
        data = await response.json()
    } catch (error) {
        console.log(error);
    }

    res.send(data);
});

app.get("/date", (req, res) => {
    res.send({ ExpressDate: new Date() });
});

app.get("/datefromfastapi", async (req, res) => {
    const response = await fetch("http://127.0.0.1:5000/date");
    const data = await response.json();
    res.send(data);
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log('Listening on port', PORT);
});