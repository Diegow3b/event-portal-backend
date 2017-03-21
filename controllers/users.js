var bcrypt = require('bcrypt');

exports.cryptPassword = (password, callback) => {
   bcrypt.genSalt(10, (err, salt) => {
    if (err) 
      return callback(err);

    bcrypt.hash(password, salt, (err, hash) => {
      return callback(err, hash);
    });

  });
};

exports.comparePassword = (password, userPassword, callback) => {
   bcrypt.compare(password, userPassword, (err, isPasswordMatch) => {
      if (err) 
        return callback(err);
      return callback(null, isPasswordMatch);
   });
};

exports.isValid = (req) => {
    const control = ['username', 'fullName', 'password', 'email'];
    let validator = true;

    control.forEach((arg) => {     
        if (validator && !req.body[arg]) validator = false
    });

    return validator;
};