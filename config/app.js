const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('../database/db');
const mongodb = require('../database/mongodb_config.json');

app.use(bodyParser.json({ type: 'application/json' }));

const url = `mongodb://${mongodb.user}:${mongodb.password}@${mongodb.host}:${mongodb.port}/${mongodb.dbname}`;
let express_config = {};

db.connect( 
    url, 
    (err) => {
        /* https://nodejs.org/api/process.html#process_exit_codes */
        if(err) {            
            console.log('Unable to connect to Mongo.');
            process.exit(1); 
        }
        console.log('Connected to MongoDB!');        
    }
);
    
express_config.app = app;
express_config.router = express.Router();

require('../core/income-range')(express_config);
module.exports = express_config;

