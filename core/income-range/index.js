const routes = require('./IncomeRangeRoutes').routes;
const db = require('../../database/db');
const mongodb = require('../../database/mongodb_config.json');
const actions = require('./actions');

module.exports = ({ app, router }) => {

    router.get(routes.INCOME_RANGES, actions.listIncomeRanges);

    router.post(routes.INCOME_RANGES, actions.createANewIncomeRange);

    app.use(routes.BASE, router);
};