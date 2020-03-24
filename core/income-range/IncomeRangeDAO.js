const db = require('../../database/db');
const IdQueryFilterBuilder = require('../../database/mongodbutils/QueryFilterBuilder');

class IncomeRangeDAO {
    constructor(logger) {

        if (!logger) throw new Error('None logger was passed when contructing IncomeRangeDAO.');
        this._collection = new Object();
        this._collection.incomerange = 'incomerange';
        this._collection.sequence = 'sequence';
        this._logger = logger;
    }

    _getNextSequenceValue(collectionid) {

        return new Promise((resolve, reject) => {

            let conn = db.get().collection(this._collection.sequence);

            let sequence = conn.findOneAndUpdate(
                { '_id': collectionid },
                { $inc: { sequence_value: 1 } }
            );

            resolve(sequence);
        }).then(resolved => {

            this._logger.debug(`New sequence created. ${resolved.value.sequence_value}`);
            return resolved;
        }).catch(error => {

            this._logger.error(this._errorMsg(error));
            return Promise.reject(error);
        });
    }

    insert(incomeRange) {
        return new Promise((resolve, reject) => {

            resolve(this._getNextSequenceValue('incomerangeid'));
        }).then(({ value }) => {

            let { sequence_value } = value;
            incomeRange.id = sequence_value;
            return incomeRange;
        }).then(incomeRange => {

            let conn = db.get().collection(this._collection.incomerange);
            this._logger.debug(`Performing "insert", parameter ${JSON.stringify(incomeRange)}`);
            let result = conn.insertOne(incomeRange);
            return result;
        }).then(resolved => {

            this._logger.debug(`Object inserted: ${JSON.stringify(resolved)}`);
            let incomerange = resolved.ops[0];
            this._logger.debug(`Returning to client: ${JSON.stringify(incomerange)}`);
            return incomerange;
        }).catch(error => {

            this._logger.error(this._errorMsg(error));
            return Promise.reject(error);
        });
    }

    list(filter) {
        return new Promise((resolve, reject) => {

            let query = new Object();
            let collection = db.get().collection(this._collection.incomerange);
            if (filter) {
                let id_database = new IdQueryFilterBuilder().setId(filter.id).build().id;
                query.id = id_database;
            }
            collection.find(query).toArray((err, results) => {
                if (err) {
                    throw new Error(err);
                }

                resolve(results);
            });

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

            let id_database = new IdQueryFilterBuilder().setId(id).build().id;
            let collection = db.get().collection(this._collection.incomerange);

            this._logger.debug(`Performing "delete", parameter ${id}`);
            resolve(collection.findOneAndUpdate(
                { id: id_database },
                { $set: { enabled: false } },
                { returnNewDocument: true }
            ));
        }).then(resolved => {

            this._logger.debug(`Object updated: ${JSON.stringify(resolved)}`);
            return resolved;
        }).then(deletionResult => {

            let result = new Object();
            result.success = deletionResult.lastErrorObject.updatedExisting;
            this._logger.debug(`Returning to client: ${JSON.stringify(result)}`);
            return result;
        }).catch(error => {

            this._logger.error(this._errorMsg(error));
            return Promise.reject(error);
        });
    }

    patch(id, data) {
        return new Promise((resolve, reject) => {

            let id_database = new IdQueryFilterBuilder().setId(id).build().id;
            let collection = db.get().collection(this._collection.incomerange);

            resolve(collection.findOneAndUpdate(
                { id: id_database },
                { $set: data },
                { returnOriginal: false }
            ));
        }).then(resolved => {

            this._logger.debug(`Performing "patch", parameters ${id} and "${JSON.stringify(data)}" and resulting in ${JSON.stringify(resolved)}`);
            return resolved;
        }).then(patchResult => {
            let result = new Object();
            result.success = patchResult.lastErrorObject.updatedExisting;
            result.updatedData = patchResult.value;

            return result;
        }).catch(error => {

            this._logger.error(this._errorMsg(error));
            return Promise.reject(error);
        });
    }

    findOne(filter) {
        return new Promise((resolve, reject) => {
            
            let query = new Object();
            let collection = db.get().collection(this._collection.incomerange);
            if (filter) {
                let id_database = new IdQueryFilterBuilder().setId(filter.id).build().id;
                query.id = id_database;
            }
            this._logger.debug(`Performing query in database, parameter ${filter.id}`);
            let queryResult = collection.findOne(query);
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