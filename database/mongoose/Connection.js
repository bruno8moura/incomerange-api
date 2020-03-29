const logger = require('../../logger').logger();
const mongoose = require('mongoose');
const mongodb = require('../mongodb_config.json');
const autoIncrement = require('mongoose-auto-increment');
const IncomeRangeModel = require('../../core/income-range/mongoose/models/IncomeRange');

class Connection {
    constructor() {
        this.isConnected = false;


        let url = `mongodb://${mongodb.user}:${mongodb.password}@${mongodb.host}:${mongodb.port}/${mongodb.database}`;
        mongoose
            .connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
            .catch(e => {//Initial errors connection, the connection will not be retryed
                logger.fatal(`Was not possible establish communiction with mongodb: ${e}`);
            });

        //Errors after initial connections, the connection will be retryed
        mongoose.connection.on('error', (err) => {
            logger.error(`Cannot possible perform the operation with mongodb: ${err}`);
        });

        mongoose.connection.once('open', () => {
            logger.info('Mongodb connected.');
            IncomeRangeModel.createModel(mongoose, (schema) => {
                schema.plugin(autoIncrement.plugin, 
                    { 
                        model: IncomeRangeModel.modelName, 
                        field: 'id', 
                        startAt: 1,
                        incrementBy: 1 
                    });
                });
            this.isConnected = true;
        });

        autoIncrement.initialize(mongoose.connection);
    }

    get mongoose() {
        if (!this.isConnected) throw new Error('The database is not connected.');
        return mongoose;
    }
}

module.exports = new Connection();