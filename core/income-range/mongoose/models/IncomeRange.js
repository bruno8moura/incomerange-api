class IncomeRange {

    static modelName = 'IncomeRange';

    constructor(mongoose) {
        this._mongoose = mongoose;        
    }

    get model() {
        return this._mongoose.model(IncomeRange.modelName);
    }

    static createModel(mongoose, done){

        let schema = new mongoose.Schema({
            min: { type: Number, required: true },
            max: { type: Number, required: true },
            currency: { type: String, required: true },
            currencyDesc: String,
            enabled: { type: Boolean, required: true },
            id: { type: Number, index: true, required: true }
        });

        done(schema);
        return new mongoose.model( IncomeRange.modelName, schema );
    }
}

module.exports = IncomeRange;