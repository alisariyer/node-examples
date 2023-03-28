const express = require('express');
const app = express();
const path = require('path');

app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

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