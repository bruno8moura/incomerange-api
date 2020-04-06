var createError = require('http-errors');
const logger = require('../logger').logger();
const Message = require('../core/error/Message');

module.exports = (app) => {
  app.use(function (req, res, next) {
    next(createError(404));
  });

  app.use((err, req, res, next) => {
    logger.error(err);

    if(err.status === 404 ){
      res.status(err.status).send();
      res.end();
      
      return;
    }
    
    if(err.status === 500 ){
      let msg = new Message('Bad things happened, sorry for that. Please contact administrator.', req.id, null);
      res.status(err.status).send(msg);
      res.end();

      return;
    }

  });
};