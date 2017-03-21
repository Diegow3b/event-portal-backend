var express = require('express');
var model = require('../models/eventos');
var controller = require('../controllers/eventos');

const router = express.Router();

/**
 * Eventos Router
 */
router.route('/')

    .get((req, res) => {        
        model.filter((err, eventos) => {
            if(err) throw err;
            res.json(eventos);
        });
    })

    .post((req, res, next) => {
        var evento = req.body;

        if(!controller.isValid(req)){
            return next(res.status(400).json({"error": "Bad Data"}));
        }

        if (!evento.end_date) evento.end_date = evento.start_date;            

        model.insert(evento, (err, evento) => {
            if(err) throw err;
            res.status(201).json(evento);
        });

    });

router.route('/:id')

    .get((req, res) => {                
        model.filter({ _id: req.params.id }, (err, evento) => {
            if(err) throw err;
            res.json(evento);
        });
    })

    .delete((req, res) => {
        model.remove({ _id:req.params.id }, (err, evento) => {
            if(err) throw err;
            res.sendStatus(204);
        });
    })

    .put((req, res, next) => {
        var evento = req.body;
        
        if(!controller.isValid(req)){
            return next(res.status(400).json({"error": "Bad Data"}));
        }
        
        model.update(req.params.id, evento, (err, evento) => {
            if(err) throw err;
            res.json(evento);
        });
                
    });
    
router.route('/name/:slug')

    .get((req, res) => {            
        model.filter({ slug: req.params.slug }, (err, user) => {
            if(err) throw err;
            res.json(user);
        });
    })

router.route('/filter')

    .post((req, res, next) => {
        var filter = req.body;

        model.filter(filter, (err, eventos) => {
            if(err) throw err;
            res.json(eventos);
        });

    });


module.exports = router;