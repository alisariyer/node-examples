const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

const main = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/testdb');
};

main()
    .then(msg => console.log('Connection open'))
    .catch(err => console.log('DB Error: ', err));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.send('Homepage');
})

app.get('/dog', (req, res) => {
    res.send('Sisst');
})

app.listen(3000, () => {
    console.log('Listening on port 3000');
});