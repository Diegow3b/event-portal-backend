var express = require('express');
var controller = require('../controllers/users');
var model = require('../models/users');
var jwt = require('jsonwebtoken');
var jwtSecret = 'f12lf1lk2flk1lj2kf';

const router = express.Router();

/**
 * Users Router
 */

router.route('/')

    .get((req, res) => {              
        model.all((err, users) => {
            if(err) throw err;            
            res.json(users);
        });
    })

    .post((req, res, next) => {
        var user = req.body;

        if(!controller.isValid(req)){
            return next(res.status(400).json({"error": "Bad Data"}));
        }                           

        model.insert(user, (err, user) => {
            if(err) throw err;
            res.json(user);
        });
    });

router.route('/:id')

    .get((req, res) => {                
        model.filter(req.params.id, (err, user) => {
            if(err) throw err;
            res.json(user);
        });
    })

    .delete((req, res) => {        
        model.remove(req.params.id, (err, user) => {
            if(err) throw err;
            res.json(user);
        });
    })

    .put((req, res, next) => {
        var user = req.body;
        
        if(!controller.isValid(req)){
            return next(res.status(400).json({"error": "Bad Data"}));
        }                

        model.update(req.params.id, user, (err, user) => {
            if(err) throw err;
            res.json(user);
        });
                
    });

router.route('/name/:slug')

    .get((req, res) => {                
        model.filterBySlug(req.params.slug, (err, user) => {
            if(err) throw err;
            res.json(user);
        });
    })

router.route('/login')

    .post(model.login, (req, res) => {
        var token = jwt.sign({ username: req.body.username }, jwtSecret);
        res.status(200).send({ token: token, username: req.body.username, status: 200 });
    });

router.route('/logout')

    .get((req, res) => {
        /**
         * 
         */
    });

module.exports = router;