var express = require('express');

const router = express.Router();

router.route('/')
    .get((req, res) => {
        res.render('index.html');
    });

module.exports = router;