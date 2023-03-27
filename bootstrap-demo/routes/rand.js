const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const rand = Math.floor(Math.random() * 10);
    res.render('rand.ejs', { rand });
});

module.exports = router;