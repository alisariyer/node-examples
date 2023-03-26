const express = require('express');
const app = express();
const port = 8080;
const path = require('path');

// Define template engine
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// Define router
const indexRouter = require('./routes/index');

// Use routing modules
app.use('/', indexRouter);


app.get('*', (req, res) => {
    res.send('404!!!!');
})

app.listen(port, () => {
    console.log(`Listening on ${port}...`)
})