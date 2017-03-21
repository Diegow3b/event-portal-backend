var mongojs = require('mongojs');
var db = mongojs('mongodb://admin:123@ds131340.mlab.com:31340/eventos', ['users']);
var slugify = require('slugify');

/**
 * ADD new user from database
 */
exports.insert = (user, callback) => {
    user.slug = slugify(user.fullName);
    db.users.save(user, (err, user) => {
        if (err) 
            return callback(err);
        return callback(null, user);
    });
};

/**
 * Obtain all users from database
 */
exports.all = (callback) => {
    db.users.find((err, users) => {
        if (err) 
            return callback(err);
        users.forEach((user)=>{
            delete user.password;
        });
        return callback(null, users);
    });
};

/**
 * Get one user from database
 */
exports.filter = (id, callback) => {    
    db.users.findOne({ _id: mongojs.ObjectId(id) },(err, user) => {
        if (err) 
            return callback(err);
        delete user.password;
        return callback(null, user);
    });
};

/**
 * Get one user from database : FILTER - SLUG
 */
exports.filterBySlug = (slug, callback) => {    
    db.users.findOne({ slug: slug },(err, user) => {
        if (err) 
            return callback(err);
        delete user.password;
        return callback(null, user);
    });
};

/**
 * Remove one object from database 
 */
exports.remove = (id, callback) => {    
    db.users.remove({ _id: mongojs.ObjectId(id) },(err, user) => {
        if (err) 
            return callback(err);
        return callback(null, user);
    });
};


/**
 * Update one object from database
 */
exports.update = (id, user, callback) => {    
    db.users.update({ _id: mongojs.ObjectId(id) }, user, {},(err, user) => {
        if (err) 
            return callback(err);
        delete user.password;
        return callback(null, user);
    });
};