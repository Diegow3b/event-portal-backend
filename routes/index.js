var express = require('express');

const router = express.Router();

router.route('/')
    .get((req, res) => {
        res.sendStatus(200);
    });

module.exports = router;