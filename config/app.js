const routes = require('../core/income-range/IncomeRangeRoutes').routes;
const express = require('express');
const app = express();

require('./requestid')(app);

const bodyParser = require('body-parser');
app.use(bodyParser.json({ type: 'application/json' }));

let express_config = new Object();
express_config.app = app;
express_config.router = express.Router();

app.use(`${routes.INCOME_RANGES_CONTRACT}`, express.static('contract-api'));

require('../core/income-range')(express_config);
require('./error')(app);
module.exports = express_config;

