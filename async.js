var Async = function () {

    var self = this;

    this.map = function (array, func, callback) {
        //array => images
        //func => downloadImage
        //callback => fonctions anonymes

        var errors = [];
        var results = [];
        var counts = array.length;

        for (var i = 0; i < array.length; i++) {
            (function (i) {
                func(array[i], function (err, res) {
                    counts--;
                    if (err) errors.push(err);
                    else results.push(res);
                    if (counts < 1) return callback((errors.length > 0 ? errors : null), results);
                });
            })(i);
        }
    };


    this.waterfall = function () {
        var jobs = arguments[0];
        var callback = (arguments.length > 2) ? arguments[2] : arguments[1];

        var job = jobs.shift();

        var after = function (error, result) {
            if (error) return callback(error);
            if (jobs.length < 1) return callback(null, result);

            var args = [];
            args.push(jobs);
            if (result != undefined) args.push(result);
            args.push(function (err, result) {
                if (err) return callback(err);
                else return callback(null, result);
            });
           self.waterfall.apply(this, args);
        };

        var args = [];
        if (arguments.length > 2) args.push(arguments[1]);
        args.push(after);
        job.apply(this, args);

    };


};

module.exports = new Async();