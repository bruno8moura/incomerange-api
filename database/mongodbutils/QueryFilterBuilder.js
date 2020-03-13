let IdQueryFilter = function(id) {
    this.id = id;
}

let IdQueryFilterBuilder = function() {
    return {
        setId: function(id){
            this._id = id;
            return this;
        },
        build: function() {
            let id = new Object();
            id['$eq'] = this._id;
            
            return new IdQueryFilter(id);
        }
    };
}

module.exports = IdQueryFilterBuilder;