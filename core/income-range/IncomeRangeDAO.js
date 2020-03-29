const IdQueryFilterBuilder = require('../../database/mongodbutils/QueryFilterBuilder');
const connection = require('../../database/mongoose/Connection');
const IncomeRangeModel = require('./mongoose/models/IncomeRange');

class IncomeRangeDAO {
    constructor(logger) {
        
        if (!logger) throw new Error('None logger was passed when contructing IncomeRangeDAO.');
        this._collection = new Object();
        this._collection.incomerange = 'incomerange';
        this._collection.sequence = 'sequence';
        this._logger = logger;
    }

    insert(incomeRange) {
        
        return new Promise((resolve, reject) => {

            this._logger.debug(`Performing "insert", parameter ${JSON.stringify(incomeRange)}`);
            let IncomeRange = new IncomeRangeModel(connection.mongoose).model;
            let model = new IncomeRange(incomeRange);
           resolve( model.save() );           
        }).then(resolved => {

            this._logger.debug(`Object inserted: ${JSON.stringify(resolved)}`);
            let incomerange = resolved;
            this._logger.debug(`Returning to client: ${JSON.stringify(incomerange)}`);
            return incomerange;
        }).catch(error => {

            this._logger.error(this._errorMsg(error));
            return Promise.reject(error);
        });
    }

    list(filter) {

        return new Promise((resolve, reject) => {
            this._logger.debug(`Performing "list", parameter ${JSON.stringify(filter)}`);

            let IncomeRange = new IncomeRangeModel(connection.mongoose).model;
            let query = new Object();
            if (filter) {
                let id_database = new IdQueryFilterBuilder().setId(filter.id).build().id;
                query.id = id_database;
            }
            
            resolve(IncomeRange.find(query));
        }).then(resolved => {

            this._logger.debug(`Performing "list", parameter ${JSON.stringify(filter)} and resulting in ${JSON.stringify(resolved)}`);
            return resolved;
        }).catch(error => {

            this._logger.error(this._errorMsg(error));
            return Promise.reject(error);
        });
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            this._logger.debug(`Performing "delete", parameter ${id}`);

            let id_database = new IdQueryFilterBuilder().setId(id).build().id;
            let IncomeRange = new IncomeRangeModel(connection.mongoose).model;
            
            resolve(IncomeRange.findOneAndUpdate(
                { id: id_database },
                { $set: { enabled: false } },
                { returnNewDocument: true }
            ));
        }).then(resolved => {
            this._logger.debug(`Object updated: ${JSON.stringify(resolved)}`);

            let result = new Object();
            result.success = !resolved.enabled;
            this._logger.debug(`Returning to client: ${JSON.stringify(result)}`);
            return result;
        }).catch(error => {

            this._logger.error(this._errorMsg(error));
            return Promise.reject(error);
        });
    }

    patch(id, data) {
        return new Promise((resolve, reject) => {
            this._logger.debug(`Performing "patch", parameter ${id}, payload ${data}`);

            let id_database = new IdQueryFilterBuilder().setId(id).build().id;
            let IncomeRange = new IncomeRangeModel(connection.mongoose).model;

            resolve(IncomeRange.findOneAndUpdate(
                { id: id_database },
                { $set: data },
                { returnOriginal: false }
            ));
        }).then(resolved => {

            this._logger.debug(`Performing "patch", parameters ${id} and "${JSON.stringify(data)}" and resulting in ${JSON.stringify(resolved)}`);
            let result = new Object();
            result.success = true;
            result.updatedData = resolved;

            return result;
        }).catch(error => {

            this._logger.error(this._errorMsg(error));
            return Promise.reject(error);
        });
    }

    findOne(filter) {
        return new Promise((resolve, reject) => {
            
            let query = new Object();
            if (filter) {
                let id_database = new IdQueryFilterBuilder().setId(filter.id).build().id;
                query.id = id_database;
            }
            this._logger.debug(`Performing query in database, parameter ${filter.id}`);
            let IncomeRange = new IncomeRangeModel(connection.mongoose).model;
            let queryResult = IncomeRange.findOne(query);
            resolve(queryResult);
        }).then(queryResult => {

            this._logger.debug(`Income Range found: ${JSON.stringify(queryResult)}`);
            return Promise.resolve(queryResult);
        })
        .catch(error => {

            this._logger.error(this._errorMsg(error));
            return Promise.reject(error);
        });
    }

    _errorMsg(error) {
        return `Error when performing ${this.constructor.name} ${error}`;
    }
}

module.exports = IncomeRangeDAO;