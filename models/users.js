var mongojs = require('mongojs');
var db = mongojs('mongodb://admin:123@ds131340.mlab.com:31340/eventos', ['users']);
var slugify = require('slugify');
var controller = require('../controllers/users');


/**
 * Authenticate User
 */
exports.login = (req, res, next) => {
    var email = req.body.email;
    var password = req.body.password;

    db.users.findOne({ email: email }, (err, user) => {
        if (user == null) {
            res.status(400).end('No account with this email');
        } else {
            req.body.username = user.username;
            controller.comparePassword(password, user.password, (err, isMatch) => {
                if (isMatch && isMatch == true) {
                    next();
                } else {
                    res.status(400).end('Invalid email or password');
                }
            })
        }
    });

};

/**
 * ADD new user from database
 */
exports.insert = (user, callback) => {
    controller.cryptPassword(user.password, (err, password) => {
        if (err) throw err;
        user.password = password;
    });

    if (!is_administrator) user.is_administrator = false;
    if (!is_active) user.is_active = false;

    user.slug = slugify(user.fullName);
    user.created_at = new Date();
    
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
        users.forEach((user) => {
            delete user.password;
        });
        return callback(null, users);
    });
};

/**
 * Get one user from database
 */
exports.filter = (id, callback) => {
    db.users.findOne({ _id: mongojs.ObjectId(id) }, (err, user) => {
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
    db.users.findOne({ slug: slug }, (err, user) => {
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
    db.users.remove({ _id: mongojs.ObjectId(id) }, (err, user) => {
        if (err)
            return callback(err);
        return callback(null, user);
    });
};


/**
 * Update one object from database
 */
exports.update = (id, user, callback) => {
    db.users.update({ _id: mongojs.ObjectId(id) }, user, {}, (err, user) => {
        if (err)
            return callback(err);
        delete user.password;
        return callback(null, user);
    });
};