exports.isValid = (req) => {
    const control = ['title', 'location', 'city', 'start_date', 'description'];
    let validator = true;

    control.forEach((arg) => {     
        if (validator && !req.body[arg]) validator = false
    });

    return validator;
};