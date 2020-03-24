const rTracer = require('cls-rtracer');
/**
 * Generate uuid for every request.
 */
module.exports = (app) => {
    //app.use(rTracer.expressMiddleware());
    app.use(rTracer.expressMiddleware({
        useHeader: true,
        headerName: 'x-request-id'
    }));

    app.all('*', (req, res, next) => {
        require('../logger').configureRequestIdToLog(rTracer.id());
        next();
    });
};