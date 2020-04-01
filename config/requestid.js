const rTracer = require('cls-rtracer');
/**
 * Generate uuid for every request.
 */
module.exports = (app) => {
    app.use(rTracer.expressMiddleware({
        useHeader: true,
        headerName: 'x-request-id'
    }));

    app.all('*', (req, res, next) => {
        let id = rTracer.id();
        require('../logger').configureRequestIdToLog(id);
        req['x-request-id'] = id;
        next();
    });
};