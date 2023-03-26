const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const redditData = require('./data.json');
console.log(redditData);

// Define template engine
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// Define router
const indexRouter = require('./routes/index');
const catsRouter = require('./routes/cats');

// Use routing modules
app.use('/', indexRouter);
app.use('/cats', catsRouter);

// Subreddit examples
app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    const data = redditData[subreddit];
    if (!data) res.redirect('/404');
    res.render('subreddit', { ...data })
})

app.get('/404', (req, res) => {
    res.status(404).send('404!!!!');
})

// Fallback routing
app.get('*', (req, res) => {
    res.status(404).send('404!!!!');
})

app.listen(port, () => {
    console.log(`Listening on ${port}...`)
})