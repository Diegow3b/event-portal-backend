var timelineLog = require('../models/timeline');

exports.addLog = (name, action='add', model) => {
    let date = new Date();
    let body;

    switch (action) {
        case "add":
            body = name + " document has been added"         
            break;
        case "edit":
            body =  name + " document has been edited"     
            break;
        case "delete":
            body =  name + " document has been deleted"         
            break;
        default:
            body =  name + " document has been added"
            break;
    }

    timelineLog.insert({
        name: name,
        action: action,
        model: model,
        date: date.toString(),
        body: body
    }, (err, timeline) => {
        if (err) throw err;
    });
};