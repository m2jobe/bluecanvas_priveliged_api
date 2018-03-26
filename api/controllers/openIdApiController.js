'use strict';

const got = require('got');
var KJUR = require('jsrsasign');
var program = require('commander');



exports.verifyAccessToken = function(req, res) {
  if (!req.headers.authorization) {
    res.status(403).json({ error: 'No credentials were sent!' });
  } else {
    var IntDate = KJUR.jws.IntDate;

    var parts = req.headers.authorization.split(' ');
    if (parts.length === 2) {
      var scheme = parts[0];
      var credentials = parts[1];

        if (/^Bearer$/i.test(scheme)) {

          var inputToken = credentials;

          var headerObj = KJUR.jws.JWS.readSafeJSONString(KJUR.b64utoutf8(inputToken.split(".")[0]));
          var payloadObj = KJUR.jws.JWS.readSafeJSONString(KJUR.b64utoutf8(inputToken.split(".")[1]));

          var sJWT = KJUR.jws.JWS.sign("HS256", headerObj, payloadObj, "60Op4HFM0I8ajz0WdiStAbziZ-VFQttXuxixHHs2R7r7-CW8GR79l-mmLqMhc-Sa");

          var currentTimestamp = Date.now() / 1000 | 0;
          var isValid = KJUR.jws.JWS.verifyJWT(sJWT,"60Op4HFM0I8ajz0WdiStAbziZ-VFQttXuxixHHs2R7r7-CW8GR79l-mmLqMhc-Sa",
                                               {alg: ['HS256'],
                                                verifyAt: IntDate.get(currentTimestamp.toString()),
                                                iss: ['https://samples.auth0.com/'],
                                                aud: ['kbyuFDidLLm280LIwVFiazOqjO3ty8KH']});

          // iss, aud and exp verified
          // retreiving userinfo_endpoint via endpoint /tokeninfo

          if (isValid) {
            got('https://samples.auth0.com/tokeninfo?id_token='+inputToken, { json: true }).then(response => {
              res.send(response.body);
            }).catch(error => {
              switch (error.statusCode) {
                default:
                    res.status(error.statusCode).json({ error: error.statusMessage });;
                    break;
                case 401:
                    res.status(error.statusCode).json({ error: error.statusMessage + ". Ensure your token is already signed." });;
              }
            });
          } else {
            res.status(403).json({ error: 'Issue verifying the token, and it iss, aud and exp' });
          }


        } else {
          res.status(403).json({ error: 'Issue with your authorization request header. Ensure your authorization header follows the formatting \'Bearer {ACCESS_TOKEN}\' ' });
        }
    } else {
      res.status(403).json({ error: 'Issue with your authorization request header. Ensure your authorization header follows the formatting \'Bearer {ACCESS_TOKEN}\' ' });
    }
  }


};
