const express = require('express');
const route = express.Router();

route.get('/', (req, res) => {
    const cats = ['felix', 'ramix', 'silver', 'asilda', 'veyley'];
    res.render('cats', { title: 'Cats Page', cats});
});

module.exports = route;