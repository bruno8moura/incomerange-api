const routes = require('./IncomeRangeRoutes');
const db = require('../../database/db');

module.exports = ({ app, router }) => {

    router.get(routes.INCOME_RANGES, (req, res) => {
        new Promise((resolve, reject) => {

            try {
                let collection = db.get().collection('incomerange');

                collection.find().toArray((err, docs) => {
                    if (err) {
                        console.log('REJECT!');
                        
                        reject(err);                        
                    }
                    resolve(docs);
                });
            } catch (error) {
                console.log('THROW ERROR!');
                throw new Error(err);
            }
        })
            .then((docs) => {
                res.statusCode = 200;
                res.send({ 'docs': docs });
                res.end();
            })
            .catch(err => {
                let message = { 'error': `${err}`, 'description': 'Não foi possível acessar o banco de dados.' }
                res.statusCode = 500;
                res.send(message);
                res.end();
            });
    });

    app.use(routes.BASE, router);
};




