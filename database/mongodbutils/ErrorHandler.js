exports.findFirstError = (error) => {
    if(error.max){
        return error.max;
    }

    if(error.min){
        return error.min;
    }

    if(error.currency){
        return error.currency;
    }

    if(error.currencyDesc){
        return error.currencyDesc;
    }

    if(error.enabled){
        return error.enabled;
    }
}