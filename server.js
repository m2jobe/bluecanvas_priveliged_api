var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  bodyParser = require('body-parser');

var RateLimit = require('express-rate-limit');
var helmet = require('helmet')

//app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)

/*var limiter = new RateLimit({
  windowMs: 15*60*1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  delayMs: 0 // disable delaying - full speed until the max limit is reached
});*/

//  apply to all requests
//app.use(limiter);

app.use(helmet({
  frameguard: false
}))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/openIdApiRoutes'); //importing route
routes(app); //register the route


app.listen(port);

console.log('RESTfull API server started on port : ' + port);

/**
 * Exporting the Express app so that it can be used by Chai for testing
 */
module.exports = app;
