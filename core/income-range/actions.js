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
const { findFirstError } = require('../../database/mongodbutils/ErrorHandler')

actions.createANewIncomeRange = function (req, res, next) {
    let logger = loggerCreateANewIncomeRange;
    let data = req.body;
    console.log(`body request ${JSON.stringify(data)}`);
    return new Promise((resolve, reject) => {

        logger.info('"createANewIncomeRange" routine started.');
        logger.info(`Request: ${JSON.stringify(data)}`);
        resolve(new IncomeRangeDAO(logger).insert(data));
    }).then(result => {
    
        res.setHeader('Location', `${routes.INCOME_RANGES}/${result.id}`);
        res.statusCode = 201;
        res.end();
        return;
    }).catch(error => {

        if('ValidationError' === error.name) {
            logger.info( `Validation error: ${error}.`);
            
            let message = new Message('Was not possible create the object Income Range.', req.id, findFirstError(error.errors).message);
            res.status(400).send(message);
            res.end();
            return;      
        }

        next(error);
        return;
    }).then(() => {
    
        logger.info('"createANewIncomeRange" routine finished.');
    });
};

actions.listIncomeRanges = function (req, res, next) {
    let logger = loggerListIncomeRanges;
    return new Promise((resolve, reject) => {
    
        logger.info('"listIncomeRanges" routine started.');
        resolve(new IncomeRangeDAO(logger).list());
    }).then(resolved => {
    
        res.statusCode = 200;
        res.send({ 'incomeranges': resolved });
        res.end();
        return;
    }).catch(error => {
    
        if('ValidationError' === error.name) {
            logger.info( `Validation error: ${error}.`);

            let message = new Message('Was not possible to retrive any Income range.', req.id, error);
            res.status(400).send(message);            
            res.end();
            return;      
        }

        next(error);
        return;
    }).then(() => {
    
        logger.info('"listIncomeRanges" routine finished.');
    });
};

actions.deleteAIncomeRange = function (req, res, next) {
    let logger = loggerDeleteAIncomeRange;
    return new Promise((resolve, reject) => {
    
        logger.info('"deleteAIncomeRange" routine started.');
        let incomerangeid = parseInt(req.params.id);
        logger.info(`Request: id: ${incomerangeid}`);
        
        let filter = new Object();
        filter.id = incomerangeid;
        let aIncomeRange = new IncomeRangeDAO(logger).findOne(filter);

        resolve(aIncomeRange);
    }).then(resolved => {
        logger.info(`Find income range. ${resolved}`);

        if(!resolved) return Promise.reject();

        let incomerangeid = resolved.id;
        return Promise.resolve(new IncomeRangeDAO(logger).delete(incomerangeid));
    }).then(resolved => {
    
        if(!resolved.success){
            return Promise.reject();
        }

        let statusCode = 204
        res.statusCode = statusCode;
        res.end();
        return;
    }).catch(error => {

        if(!error){
            logger.info('Resource not found.');
            res.status(404).send();
            res.end();
            return;  
        }

        if('ValidationError' === error.name) {
            logger.info( `Validation error: ${error}.`);

            let message = new Message('Was not possible to retrive any Income Range.', req.id, error);
            res.status(400).send(message);
            res.end();
            return;      
        }

        next(error);
        return;
    }).then(() => {
    
        logger.debug('"deleteAIncomeRange" routine finished.');
    });
};

actions.findAIncomeRange = function (req, res, next) {
    let logger = loggerFindAIncomeRange;
    return new Promise((resolve, reject) => {
        
        logger.info('"findAIncomeRange" routine started.');
        let incomerangeid = isNaN(req.params.id) ? 0 : parseInt(req.params.id);
        logger.info(`Request: ${JSON.stringify(req.params)}`);
        if (incomerangeid === 0) {
            return resolve();
        }

        let filter = new Object();
        filter.id = incomerangeid;
        resolve(new IncomeRangeDAO(logger).findOne(filter));
    }).then(resolved => {

        if(!resolved) return Promise.reject();
    
        res.status(200).send(resolved);
        res.end();
        return;
    }).catch(error => {
    
        if(!error) {
            logger.info('Resource not found.');
            res.status(404).send(resolved);
            res.end();
            return;
        }

        if('ValidationError' === error.name) {
            logger.info( `Validation error: ${error}.`);

            let message = new Message('Was not possible to retrive any Income Range.', req.id, error);
            res.status(400).send(message);
            res.end();
            return;
        }

        next(error);
        return;
    }).then(() => {
    
        logger.info('"findAIncomeRange" routine finished.');
    });
};

actions.patchAIncomeRange = function (req, res, next) {
    let logger = loggerPatchAIncomeRange;
    logger.info('"patchAIncomeRange" routine started.');
    logger.info(`Request: ${JSON.stringify(req.params)} ${JSON.stringify(req.body)}`);
    let incomerangeid = isNaN(req.params.id) ? 0 : parseInt(req.params.id);
    let { patches } = req.body;
    return new Promise((resolve, reject) => {
        
        if (incomerangeid === 0) {
            return resolve();
        }

        let filter = new Object();
        filter.id = incomerangeid;
        let aIncomeRange = new IncomeRangeDAO(logger).findOne(filter);

        resolve(aIncomeRange);
    }).then(aIncomeRange => {
        
        if (aIncomeRange) {
            logger.info(`Income Range found: ${JSON.stringify(aIncomeRange)}`);
            jsonPatch.apply(aIncomeRange, patches);
            return Promise.resolve(new IncomeRangeDAO(logger).patch(incomerangeid, aIncomeRange));
        }

        logger.info(`Income Range not found: ${aIncomeRange}`);
        return Promise.reject();
    }).then(resolved => {

        res.status(204);
        res.setHeader('Location', req.path);
        res.end();
        logger.info(`204 code returned to client. ${JSON.stringify(resolved)}`);
        return ;
    }).catch(error => {
        
        if (!error) {
            logger.info('Resource not found.');
            res.status(404).send();
            res.end();
            return ;
        }

        if('ValidationError' === error.name || 'PatchConflictError' === error.name) {
            logger.info( `Validation error: ${error}.`);
            
            let message = new Message(error.message, req.id);
            res.status(400).send(message);
            res.end();
            return;
        }

        next(error);
        return;
    }).then(() => {
        logger.info('"patchAIncomeRange" routine finished.');
    });
};

module.exports = actions;
