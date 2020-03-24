const express = require('express');
const app = express();

require('./requestid')(app);

const db = require('../database/db');
const mongodb = require('../database/mongodb_config.json');

const bodyParser = require('body-parser');
app.use(bodyParser.json({ type: 'application/json' }));

const url = `mongodb://${mongodb.user}:${mongodb.password}@${mongodb.host}:${mongodb.port}/${mongodb.database}`;

db.connect(
    url,
    mongodb.database,
    (err) => {
        /* https://nodejs.org/api/process.html#process_exit_codes */
        if (err) {
            /*
            * If we are here, the application need wait 5 seconds, just to finish 'log things',
            * and then to finish the application.
            */
           setTimeout(() => {
               process.exit(1);                
            }, 5000);
        }
    }
    );
    
let express_config = new Object();
express_config.app = app;
express_config.router = express.Router();

require('../core/income-range')(express_config);
module.exports = express_config;

