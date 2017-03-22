var express = require('express');
var model = require('../models/timeline');

const router = express.Router();

/**
 * Timelines Router
 */
router.route('/')

    .get((req, res) => {        
        model.filter((err, timelines) => {
            if(err) throw err;
            res.json(timelines);
        });
    });    

module.exports = router;