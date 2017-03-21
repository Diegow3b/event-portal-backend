var mongojs = require('mongojs');
var db = mongojs('mongodb://admin:123@ds131340.mlab.com:31340/eventos', ['eventos']);
var slugify = require('slugify');

db.on('error', function (err) {
    console.log('database error', err)
})
 
db.on('connect', function () {
    console.log('database connected')
})

/**
 * ADD new evento from database
 */
exports.insert = (evento, callback) => {
    evento.slug = slugify(evento.title);
    db.eventos.save(evento, (err, evento) => {
        if (err) 
            return callback(err);
        return callback(null, evento);
    });
};

/**
 * Obtain all or filtered eventos from database
 */
exports.filter = (params, callback) => {
    if (params._id) params._id = mongojs.ObjectId(params._id)
    if (params.date){
        if ( params.date.length > 1){
            params.start_date = { $gte: params.date[0] };
            params.end_date = { $lte: params.date[1] };
        }else{
            params.start_date = params.date[0];
        }        

        delete params.date
    }

    db.eventos.find(params,(err, eventos) => {
        if (err) 
            return callback(err);
        return callback(null, eventos);
    });
};

/**
 * Remove one object from database 
 */
exports.remove = (params, callback) => {
    if (!params) return
    if(params._id) params._id = mongojs.ObjectId(params._id) 
    db.eventos.remove(params,(err, evento) => {
        if (err) 
            return callback(err);
        return callback(null, evento);
    });
};

/**
 * Update one object from database
 */
exports.update = (id, evento, callback) => {
    if (evento._id) delete evento._id;
    db.eventos.update({ _id: mongojs.ObjectId(id) }, evento, {},(err, evento) => {
        if (err) 
            return callback(err);
        return callback(null, evento);
    });
};