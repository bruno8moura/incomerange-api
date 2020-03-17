const IncomeRangeDAO = require('./IncomeRangeDAO');
const { routes } = require('./IncomeRangeRoutes');
const Message = require('../error/Message');
const jsonPatch = require('json-patch');
let actions = new Object();

actions.createANewIncomeRange = function (req, res) {
    let data = req.body;

    //TODO HOW TO DEAL WITH RETURNS TO CLIENT?

    console.log(`body request ${JSON.stringify(data)}`);
    return new Promise((resolve, reject) => {
        try {
            let dao = new IncomeRangeDAO();
            resolve(dao.insert(data));
        } catch (error) {
            reject(error);
        }
    }).then( result => {
        res.setHeader('Location', `${routes.INCOME_RANGES}/${result.id}`);
        res.statusCode = 201;
        res.end();
    }).catch(result => {
        res.statusCode = 500;
        res.send({ 'message': 'Was not possible create the object Income Range.', 'error': `${result}` });
        res.end();
    });

};

actions.listIncomeRanges = function (req, res) {
    return new Promise((resolve, reject) => {
        resolve(new IncomeRangeDAO().list());
    }).then(resolved => {
        res.statusCode = 200;
        res.send({ 'incomeranges': resolved });
        res.end();
    }).catch(error => {
        res.statusCode = 500;
        res.send(new Message('Was not possible to retrive any Income range.', error));
        res.end();
    });
};

actions.deleteAIncomeRange = function(req, res) {    
    return new Promise( (resolve, reject) => {
        let incomerangeid = parseInt(req.params.id);
        resolve(new IncomeRangeDAO().delete(incomerangeid));
    } ).then( resolved => {
        let statusCode = resolved.success ? 204 : 404;
        res.statusCode = statusCode;
        res.end();
    }).catch( error => {
        res.statusCode = 500;
        res.send(`Was not possible to retrive any Income Range, ${error}`);
        res.end();
    });
}

actions.findAIncomeRange = function(req, res) {    
    return new Promise( (resolve, reject) => {
        let incomerangeid = isNaN( req.params.id ) ? 0 : parseInt(req.params.id);
        if(incomerangeid === 0){
            return resolve();
        }

        let filter = new Object();
        filter.id = incomerangeid;
        resolve(new IncomeRangeDAO().list(filter));
    } ).then( resolved => {
        res.statusCode = resolved ? 200 : 404;
        res.send(resolved);
        res.end();
    }).catch( error => {
        res.statusCode = 500;
        res.send(`Was not possible to retrive any Income Range, ${error}`);
        res.end();
    });
}

actions.patchAIncomeRange = function(req, res) {    
    let incomerangeid = isNaN( req.params.id ) ? 0 : parseInt(req.params.id);
    let { patches } = req.body;
    return new Promise( (resolve, reject) => {
        if(incomerangeid === 0){
            return resolve();
        }
        
        let filter = new Object();
        filter.id = incomerangeid;
        let aIncomeRange = new IncomeRangeDAO().findOne(filter);

        resolve( aIncomeRange );
    }).then( aIncomeRange => {
        if(aIncomeRange){
            jsonPatch.apply( aIncomeRange, patches );
            return Promise.resolve(new IncomeRangeDAO().patch(incomerangeid, aIncomeRange));        
        }

        return Promise.resolve();        
    }).then( resolved => {
        if( !resolved ) {
            res.status(404);
        }

        res.status(204);
        res.setHeader('Location', req.path);
        
        res.end(); 
    }).catch( error => {
        //some log here ${error}
        let message = new Message(`Was not possible perform operation, sorry about that. Wait a minute and try later or, if the problem persists, contact the administrator. ;)`);
        res.status(500).send(message);
        res.end();
    });
}

module.exports = actions;
