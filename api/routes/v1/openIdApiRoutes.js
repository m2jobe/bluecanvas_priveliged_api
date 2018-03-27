'use strict';
module.exports = function(app) {
  var todoList = require('../../controllers/openIdApiController');

  // todoList Routes
  app.route('/v1/verifyAccessToken')
    .get(todoList.verifyAccessToken)
    ;


};
