class IncomeRangeModel {
    constructor(id=0, descricao){
        this._id = id;
        this._descricao = descricao;
    }

    get id() {
        return this._id;
    }

    get descricao() {
        return this._descricao;
    }
}

module.exports = IncomeRangeModel;