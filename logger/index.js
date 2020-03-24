const log4js = require('log4js');
const config_log4js = require('../config/log4js.js');

exports.configureRequestIdToLog = (requestId) => {
    log4js.configure(config_log4js(requestId));
}

exports.logger = (category = 'default') => { 
    if('default' === category){
        log4js.configure(config_log4js());
    }
    
    return log4js.getLogger(category);
};
