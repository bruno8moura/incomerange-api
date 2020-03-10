const routes = require('./IncomeRangeRoutes').routes;
const db = require('../../database/db');
const mongodb = require('../../database/mongodb_config.json');
const actions = require('./actions');

module.exports = ({ app, router }) => {

    router.get(routes.INCOME_RANGES, (req, res) => {
        new Promise((resolve, reject) => {

            try {
                let collection = db.get().collection(mongodb.collection.incomerange);

                collection.find().toArray((err, docs) => {
                    if (err) {
                        console.log('REJECT!');
                        throw new Error(err);
                    }
                    resolve(docs);
                });
            } catch (error) {
                console.log(`THROW ERROR! ${error}`);
                reject(error);
            }
        })
        .then((incomeranges) => {
            res.statusCode = 200;
            res.send({ incomeranges });
            res.end();
        })
        .catch(err => {
            let message = { 'error': `${err}`, 'description': 'Não foi possível acessar o banco de dados.' }
            res.statusCode = 500;
            res.send(message);
            res.end();
        });
    });

    router.post( routes.INCOME_RANGES, actions.createANewIncomeRange);

    app.use(routes.BASE, router);
};