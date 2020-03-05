let mongodb_config = require('./mongodb_config.json');
var MongoClient = require('mongodb').MongoClient;

var state = {
    db: null
}

exports.connect = function (url, done) {
    if (state.db) return done();

    MongoClient.connect(
        url,
        { useUnifiedTopology: true },
        function (err, client) {
            if (err) return done(err);

            state.db = client.db(mongodb_config.dbname);
            done();
        }

    );
}

exports.get = function () {
    return state.db;
}

exports.close = function (done) {
    if (state.db) {
        state.db.close(
            function (err, result) {
                state.db = null
                state.mode = null
                done(err)
            }
        );
    }
}


/*
const mongodb = require('./mongodb_config.json');

this.connect(
    `mongodb://${mongodb.user}:${mongodb.password}@${mongodb.host}:${mongodb.port}/${mongodb.dbname}`,
    function (err) {
        if (err) {
            console.log('Unable to connect to Mongo.')
            process.exit(1)
        } else {
            app.listen(3000, function () {
                console.log('Listening on port 3000...')
            })
        }
    }
);

*/