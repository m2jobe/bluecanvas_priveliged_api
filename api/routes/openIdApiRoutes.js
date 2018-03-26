'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/openIdApiController');

  // todoList Routes
  app.route('/verifyAccessToken')
    .get(todoList.verifyAccessToken)
    ;


};
