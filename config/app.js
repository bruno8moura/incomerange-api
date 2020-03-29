
const express = require('express');
const app = express();

require('./requestid')(app);

const bodyParser = require('body-parser');
app.use(bodyParser.json({ type: 'application/json' }));

let express_config = new Object();
express_config.app = app;
express_config.router = express.Router();

require('../core/income-range')(express_config);
module.exports = express_config;

