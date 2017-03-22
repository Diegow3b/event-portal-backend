var mongojs = require('mongojs');
var db = mongojs('mongodb://admin:123@ds131340.mlab.com:31340/eventos', ['timeline']);

db.on('error', function (err) {
    console.log('database error', err)
})
 
db.on('connect', function () {
    console.log('database connected')
})

/**
 * ADD new timeline in database
 */
exports.insert = (obj, callback) => {
    db.timeline.save(obj, (err, obj) => {
        if (err) 
            return callback(err);
        return callback(null, obj);
    });
};

/**
 * Obtain all or filtered timelines from database
 */
exports.filter = (params, callback) => {
    if (params._id) params._id = mongojs.ObjectId(params._id)

    db.timeline.find(params,(err, timelines) => {
        if (err) 
            return callback(err);
        return callback(null, timelines);
    });
};