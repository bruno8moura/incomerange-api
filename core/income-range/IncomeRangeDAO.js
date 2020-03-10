const db = require('../../database/db');

class IncomeRangeDAO {
    constructor() {
        this._collection = new Object();

        this._collection.incomerange = 'incomerange';
        this._collection.sequence = 'sequence';
    }

    _getNextSequenceValue(collectionid) {

        return new Promise((resolve, reject) => {
            let conn = db.get().collection(this._collection.sequence);
            try {
                let sequence = conn.findOneAndUpdate(
                    { '_id': collectionid },
                    { $inc: { sequence_value: 1 } }
                );

                resolve(sequence);
            } catch (e) {
                //TODO some log here
                reject(e)
            }
        });
    }

    insert(incomeRange) {
        return new Promise((resolve, reject) => {
            try {
                resolve(this._getNextSequenceValue('incomerangeid'));
            } catch (e) {
                //TODO some log here
                reject(e);
            }
        })
        .then(({ value }) => {
            let { sequence_value } = value;
            incomeRange.id = sequence_value;

            return incomeRange;
        })
        .then(incomeRange => {
            let conn = db.get().collection(this._collection.incomerange);
            let result = conn.insertOne(incomeRange);

            return result;
        })
        .catch(e => {
            //TODO some log here
            console.log(e);

            return e;
        });
    }
}

module.exports = IncomeRangeDAO;