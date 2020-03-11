class IncomeRangeModel {
    constructor(id, min, max, currency, currencyDesc){

        this._id = id;
        this._min = min;
        this._max = max;
        this._currency = currency;        
        this._currencyDesc = currencyDesc;
    }

    get id() {
        return this._id;
    }
    
    get min() {
        return this._min;
    }
    
    get max() {
        return this._max;
    }
    
    get currency() {
        return this._currency;
    }

    get currencyDesc() {
        return this._currencyDesc;
    }
}

module.exports = IncomeRangeModel;