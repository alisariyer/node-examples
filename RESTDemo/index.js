const express = require('express');
const app = express();
const path = require('path');

app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const comments = [
    {
        username: 'Felix',
        comment: 'Hey, this is so funny!'
    },
    {
        username: 'Adam',
        comment: 'Cute cat, white and black harmony!'
    },
    {
        username: 'Selim',
        comment: 'Your app is very effective.'
    },
    {
        username: 'Canan',
        comment: 'Can you make more than that, more complicated?'
    },
    {
        username: 'Danny',
        comment: 'I am just sleeping, please do not interrupt me!'
    },
    {
        username: 'Said',
        comment: 'Read more and get lightener'
    },
    {
        username: 'Will',
        comment: 'No time, no money. Man what\'s up?'
    }
]

// Index REST pattern: show all comments
app.get('/comments', (req, res) => {
    res.render('comments/index', { comments });
})

// New REST pattern: send new form page
app.get('/comments/new', (req, res) => {
    res.render('comments/new');
})

// Create REST pattern: create a new comment
app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment });
    res.send('it worked');
})

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

// GET /comments                : list all comments
// POST /comments             : create a new comment
// GET /comments/:id         : get one comment using id
// PATCH /comments/:id    : update one comment
// DELETE /comments/:id  : destroy one comment

// Note from the course
// NAME    PATH                VERB      PURPOSE
// Index   /comments           GET       Display all comments
// New     /comments/new       GET       Form to create new comment
// Create  /comments           POST      Creates new comment on server
// Show    /comments/:id       GET       Details for one specific comment
// Edit    /comments/:id/edit  GET       Form to edit specific comment
// Update  /comments/:id       PATCH
// Destroy /comments/:id       DELETE