const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(express.json());

app.get('/tacos', (req, res) => {
    res.send("GET /tacos response");
})

app.post('/tacos', (req, res) => {
    const { meat, qty } = req.body;
    res.send(`OK, Here is ${qty} ${meat} tacos!!!`);
})

app.listen(3000, (req, res) => {
    console.log('Listening on port 3000');
})