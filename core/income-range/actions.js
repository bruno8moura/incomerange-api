const IncomeRangeDAO = require('./IncomeRangeDAO');
const routes = require('./IncomeRangeRoutes').routes;
let actions = new Object();

actions.createANewIncomeRange = function (req, res) {
    let data = req.body;

    //TODO HOW TO DEAL WITH RETURNS TO CLIENT?

    console.log(`body request ${JSON.stringify(data)}`);
    return new Promise( (resolve, reject) => {
        try {
            console.log(1);
            
            let dao = new IncomeRangeDAO();
            resolve( dao.insert(data) );
        } catch (error) {
            reject( error );
        }
    } )
    .then( result => {
        res.setHeader('Location', `${routes.INCOME_RANGES}/${result.id}`);
        res.statusCode = 302;
        res.end();
    })
    .catch( result => {
        res.statusCode = 500;
        res.send({'message': 'Was not possible create the object Income Range.', 'error': `${result}`});
        res.end();
    } );

};

module.exports = actions;
