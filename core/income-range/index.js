const routes = require('./IncomeRangeRoutes').routes;
const actions = require('./actions');

module.exports = ({ app, router }) => {

    router.get(routes.INCOME_RANGES, actions.listIncomeRanges);

    router.post(routes.INCOME_RANGES, actions.createANewIncomeRange);

    router.delete(routes.A_INCOME_RANGE, actions.deleteAIncomeRange);

    router.get(routes.A_INCOME_RANGE, actions.findAIncomeRange);

    app.use(routes.BASE, router);
};