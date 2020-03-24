const logger = require('../logger').logger();
var MongoClient = require('mongodb').MongoClient;

var state = {
    db: null
}

exports.connect = function (url, database, done) {
    if (state.db) return done();

    MongoClient.connect(
        url,
        { useUnifiedTopology: true },
        function (err, client) {
            if (err) {
                logger.error( 'Was not possible connect to database: ' );
                logger.error( err );
                return done(err);
            }
            logger.info('Mongodb connected.');
            state.db = client.db( database );
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