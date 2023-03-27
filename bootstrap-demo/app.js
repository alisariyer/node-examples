const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const redditData = require('./data.json');

// Define template engine
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// Static route (You can define multiple as js, css etc. but now only public)
// app.use(express.static('public')); we comment it because it does not work in other directories
// with path.join(__dirname, path) we get absolute path of the current file
app.use(express.static(path.join(__dirname, 'public')));

// Define router
const indexRouter = require('./routes/index');
const randRouter = require('./routes/rand');

// Use routing modules
app.use('/', indexRouter);
app.use('/rand', randRouter);

// Subreddit examples
app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    const data = redditData[subreddit];
    if (!data) res.render('notfound', { subreddit });
    res.render('subreddit', { ...data })
})

// Fallback routing
app.get('*', (req, res) => {
    res.status(404).send('404!!!!');
})

app.listen(port, () => {
    console.log(`Listening on ${port}...`)
})