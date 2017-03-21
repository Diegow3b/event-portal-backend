
var pad = (num, size=2) => {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

module.exports = (req, res, next) => {
    var start = +new Date();
    var stream = process.stdout;
    var url = req.url;
    var method = req.method;
    var protocol = req.protocol.toUpperCase();
    var protocolVersion = req.httpVersion;
    var path = req.path;
    var currentdate = new Date();
    var datetime = `[${currentdate.getDate()}/${(pad(currentdate.getMonth()+1))}/${currentdate.getFullYear()} ${pad(currentdate.getHours())}:${pad(currentdate.getMinutes())}:${pad(currentdate.getSeconds())}]`

    res.on('finish', () => {
        var duration = +new Date() - start;
        var message = `${datetime}  "${method} ${path} ${protocol}/${protocolVersion}" ${res.statusCode} - took ${duration} ms\n`
        stream.write(message);
    });
    next();
}