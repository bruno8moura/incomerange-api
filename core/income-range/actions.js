const IncomeRangeDAO = require('./IncomeRangeDAO');
const routes = require('./IncomeRangeRoutes').routes;
const Message = require('../error/Message');
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

module.exports = actions;
