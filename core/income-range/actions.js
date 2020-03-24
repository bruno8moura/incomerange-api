const IncomeRangeDAO = require('./IncomeRangeDAO');
const { routes } = require('./IncomeRangeRoutes');
const Message = require('../error/Message');
const jsonPatch = require('json-patch');
let actions = new Object();
const loggerListIncomeRanges = require('../../logger').logger('ListIncomeRanges');
const loggerCreateANewIncomeRange = require('../../logger').logger('CreateANewIncomeRange');
const loggerDeleteAIncomeRange = require('../../logger').logger('DeleteAIncomeRange');
const loggerFindAIncomeRange = require('../../logger').logger('FindAIncomeRange');
const loggerPatchAIncomeRange = require('../../logger').logger('PatchAIncomeRange');

actions.createANewIncomeRange = function (req, res) {
    
    let data = req.body;
    console.log(`body request ${JSON.stringify(data)}`);
    return new Promise((resolve, reject) => {

        loggerCreateANewIncomeRange.info('"createANewIncomeRange" routine started.');
        loggerCreateANewIncomeRange.info(`Request: ${JSON.stringify(data)}`);
        resolve(new IncomeRangeDAO(loggerCreateANewIncomeRange).insert(data));
    }).then(result => {
    
        res.setHeader('Location', `${routes.INCOME_RANGES}/${result.id}`);
        res.statusCode = 201;
        res.end();
        return;
    }).catch(result => {
    
        res.statusCode = 500;
        res.send({ 'message': 'Was not possible create the object Income Range.', 'error': `${result}` });
        res.end();
        return;
    }).then(() => {
    
        loggerCreateANewIncomeRange.info('"createANewIncomeRange" routine finished.');
    });
};

actions.listIncomeRanges = function (req, res) {
    
    return new Promise((resolve, reject) => {
    
        loggerCreateANewIncomeRange.info('"listIncomeRanges" routine started.');
        resolve(new IncomeRangeDAO(loggerListIncomeRanges).list());
    }).then(resolved => {
    
        res.statusCode = 200;
        res.send({ 'incomeranges': resolved });
        res.end();
        return;
    }).catch(error => {
    
        let msg = 'Was not possible to retrive any Income range.';
        loggerListIncomeRanges.error(`${msg} ${error}`)
        res.statusCode = 500;
        res.send(new Message(msg, null));
        res.end();
        return;
    }).then(() => {
    
        loggerCreateANewIncomeRange.info('"listIncomeRanges" routine finished.');
    });
};

actions.deleteAIncomeRange = function (req, res) {
    
    return new Promise((resolve, reject) => {
    
        loggerDeleteAIncomeRange.info('"deleteAIncomeRange" routine started.');
        let incomerangeid = parseInt(req.params.id);
        loggerDeleteAIncomeRange.info(`Request: ${incomerangeid}`);
        resolve(new IncomeRangeDAO(loggerDeleteAIncomeRange).delete(incomerangeid));
    }).then(resolved => {
    
        let statusCode = resolved.success ? 204 : 404;
        res.statusCode = statusCode;
        res.end();
        return;
    }).catch(error => {
    
        res.statusCode = 500;
        res.send(`Was not possible to retrive any Income Range, ${error}`);
        res.end();
        return;
    }).then(() => {
    
        loggerDeleteAIncomeRange.debug('"deleteAIncomeRange" routine finished.');
    });
};

actions.findAIncomeRange = function (req, res) {
    
    return new Promise((resolve, reject) => {
        
        loggerFindAIncomeRange.info('"findAIncomeRange" routine started.');
        let incomerangeid = isNaN(req.params.id) ? 0 : parseInt(req.params.id);
        loggerFindAIncomeRange.info(`Request: ${JSON.stringify(req.params)}`);
        if (incomerangeid === 0) {
            return resolve();
        }

        let filter = new Object();
        filter.id = incomerangeid;
        resolve(new IncomeRangeDAO(loggerFindAIncomeRange).findOne(filter));
    }).then(resolved => {
    
        res.statusCode = resolved ? 200 : 404;
        res.send(resolved);
        res.end();
        return;
    }).catch(error => {
    
        res.statusCode = 500;
        res.send(`Was not possible to retrive any Income Range, ${error}`);
        res.end();
        return;
    }).then(() => {
    
        loggerFindAIncomeRange.info('"findAIncomeRange" routine finished.');
    });
};

actions.patchAIncomeRange = function (req, res) {
    
    loggerPatchAIncomeRange.info('"patchAIncomeRange" routine started.');
    loggerPatchAIncomeRange.info(`Request: ${JSON.stringify(req.params)} ${JSON.stringify(req.body)}`);
    let incomerangeid = isNaN(req.params.id) ? 0 : parseInt(req.params.id);
    let { patches } = req.body;
    return new Promise((resolve, reject) => {
        
        if (incomerangeid === 0) {
            return resolve();
        }

        let filter = new Object();
        filter.id = incomerangeid;
        let aIncomeRange = new IncomeRangeDAO(loggerPatchAIncomeRange).findOne(filter);

        resolve(aIncomeRange);
    }).then(aIncomeRange => {
        
        if (aIncomeRange) {
            loggerPatchAIncomeRange.info(`Income Range found: ${JSON.stringify(aIncomeRange)}`);
            jsonPatch.apply(aIncomeRange, patches);
            return Promise.resolve(new IncomeRangeDAO(loggerPatchAIncomeRange).patch(incomerangeid, aIncomeRange));
        }

        loggerPatchAIncomeRange.info(`Income Range not found: ${aIncomeRange}`);
        return Promise.resolve();
    }).then(resolved => {

        if (!resolved) {
            res.status(404);
            res.end();
            loggerPatchAIncomeRange.info('404 code returned to client.');
            return ;
        }

        res.status(204);
        res.setHeader('Location', req.path);
        res.end();
        loggerPatchAIncomeRange.info(`204 code returned to client. ${JSON.stringify(resolved)}`);
        return ;
    }).catch(error => {
        
        let message = new Message(`Was not possible perform operation, sorry about that. Wait a minute and try later or, if the problem persists, contact the administrator. ;)`);
        res.status(500).send(message);
        res.end();
    }).then(() => {
        loggerPatchAIncomeRange.info('"patchAIncomeRange" routine finished.');
    });
};

module.exports = actions;
