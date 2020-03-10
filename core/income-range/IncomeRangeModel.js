class IncomeRangeModel {
    constructor(id, min, max, currency, currencyDesc){

        this._id = id;
        this._min = min;
        this._max = max;
        this._currency = currency;        
        this._currencyDesc = currencyDesc;
    }

    get id() {
        return this.id;
    }
    
    get min() {
        return this.min;
    }
    
    get max() {
        return this.max;
    }
    
    get currency() {
        return this.currency;
    }

    get currencyDesc() {
        return this.currencyDesc;
    }
}

module.exports = IncomeRangeModel;