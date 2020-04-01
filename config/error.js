const logger = require('../logger').logger();
const Message = require('../core/error/Message');

module.exports = (app) => {
    app.use((err, req, res, next) => {
        logger.error(err);
        
        let msg = new Message('Bad things happened, sorry for that. Please contact administrator.', req.id, null);
        
        res.status(500).send(msg);
        res.end();
      });
};