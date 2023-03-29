const express = require('express');
const app = express();
const path = require('path');
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override');

app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(express.json());

// Override with POST having ?_method=DELETE or other verbs (_method can be another string)
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

let comments = [
    {
        id: uuid(),
        username: 'Felix',
        comment: 'Hey, this is so funny!'
    },
    {
        id: uuid(),
        username: 'Adam',
        comment: 'Cute cat, white and black harmony!'
    },
    {
        id: uuid(),
        username: 'Selim',
        comment: 'Your app is very effective.'
    },
    {
        id: uuid(),
        username: 'Canan',
        comment: 'Can you make more than that, more complicated?'
    },
    {
        id: uuid(),
        username: 'Danny',
        comment: 'I am just sleeping, please do not interrupt me!'
    },
    {
        id: uuid(),
        username: 'Said',
        comment: 'Read more and get lightener'
    },
    {
        id: uuid(),
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
    comments.push({ id: uuid(), username, comment });
    res.redirect('/comments');
})

// Show REST pattern: show a unique comment
app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', { comment });
});

// Edit REST pattern: edit a comment to use with next PATCH request
app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment });
})

// Update REST pattern: update a comment
app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newComment = req.body.comment;
    const targetComment = comments.find(c => c.id === id);
    targetComment.comment = newComment;
    res.redirect('/comments');
});

// Destroy REST pattern: delete a comment
app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    // This is not good idea normally muted arrays but temporarly
    // Because filter creates a new array
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');
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