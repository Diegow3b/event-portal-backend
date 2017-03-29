var request = require('supertest');
var app = require('./../app');
var model = require('../models/eventos');  

var tearDown = () => {
    // FlushDB
}

var config = () => {
    //Initial DB Data
}

/**
 * Root Path Test
 */
describe('Requests to the root path', () => {

    it('Returns a 200 status code', (done) => {
        request(app)
            .get('/')
            .expect(200, done)
    });

    it('Returns a TEXT format', (done) => {
        request(app)
            .get('/')
            .expect('Content-Type', /text/, done)
    });

});

/**
 * Api Eventos Test
 */
describe('Listing eventos on api/eventos', () => {

    after(() => {        
        model.filter({ title: 'unit_api_test_post' }, (err, evento) => {
            if(err) throw err;
            model.remove({ title: 'unit_api_test_post' }, (err, evento) => {
                if(err) throw err;
            });
        });
    });

    it('Return 200 status code', (done) => {
        request(app)
            .get('/api/eventos')
            .expect(200, done);
    });

    it('Return JSON format', (done) => {
        request(app)
            .get('/api/eventos')
            .expect('Content-Type', /json/, done);            
    });

    it('Returns a single Evento', (done) => {
        request(app)
            .get('/api/eventos/58c81453734d1d6351026a1b')            
            .expect((res) => {
                res.body._id, '58c81453734d1d6351026a1b';
                res.body.title, 'ROUTE 303 STAGE';
            })
            .expect(200, done);
    });

    // it('Validades evento mandatory attributes (title, location, start_date, description)',(done) => {

    it('Return 201 status code',(done) => {
        request(app)
            .post('/api/eventos')
            .send({
                "title": "unit_api_test_post",
                "location": "any location",
                "start_date": "01 January 1970",
                "city": "Salvador - BA",
                "description": "Lorem Ipsum",
                "producer": "The Producer"
            })
            .expect(201, done);
    });

    /**
     * TODO:
        * PUT
        * DELETE
     */
    
});

describe('Listing users on api/users/name', () => {

    it('Return 200 status code', (done) => {
        request(app)
            .get('/api/eventos/name/route-303-stage')
            .expect(200, done);
    });

});


/**
 * Api Users Test
 */
describe('Listing users on api/users', () => {
    it('Return 200 status code', (done) => {
        request(app)
            .get('/api/users')
            .expect(200, done);
    });

    it('Return JSON format', (done) => {
        request(app)
            .get('/api/users')
            .expect('Content-Type', /json/, done);            
    });

    /**
     * TODO:
        * GET on Single Object
        * POST
        * PUT
        * DELETE
        * AUTHENTICATION
        * COMPARING PASSWORD
        * HASING PASSWORD
     */
    
});