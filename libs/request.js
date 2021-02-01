var http = require('https');

var request = function (data, callback) {
    if (!data.url) return callback(new Error("insert image url in data.url"));
    console.log("start :", data.url);
    http.get(data.url, function (response) {
        var body = '';
        response.on('data', function (d) {
            body += d;
        });
        response.on('end', function () {
            console.log("finish", data.url, "size :" + body.length)
            return callback(null, body);
        });
    }).on('error', function (e) {
        console.log("got error : " + e.message);d
    });
};

module.exports = request;