'use strict';
module.exports = function(app) {
  var controller = require('../../controllers/openIdApiController');

  // todoList Routes
  app.route('/v1/verifyAccessToken')
    .get(controller.verifyAccessToken)
    ;
  app.route('*')
    .get(controller.returnBadRequest)

};
