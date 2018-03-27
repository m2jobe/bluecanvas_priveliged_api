'use strict';

const got = require('got');
var KJUR = require('jsrsasign');
var program = require('commander');



exports.verifyAccessToken = function(req, res) {
  const clientSecret = "60Op4HFM0I8ajz0WdiStAbziZ-VFQttXuxixHHs2R7r7-CW8GR79l-mmLqMhc-Sa";

  if (!req.headers.authorization) {
    res.status(403).json({ error: 'No credentials were sent!' });
  } else {
    var IntDate = KJUR.jws.IntDate;

    var parts = req.headers.authorization.split(' ');
    if (parts.length === 2) {
      var scheme = parts[0];
      var credentials = parts[1];
        //Ensure formatting of Authorization header
        if (/^Bearer$/i.test(scheme)) {

          var inputToken = credentials;

          //Split Token into header and payload
          var headerObj = KJUR.jws.JWS.readSafeJSONString(KJUR.b64utoutf8(inputToken.split(".")[0]));
          var payloadObj = KJUR.jws.JWS.readSafeJSONString(KJUR.b64utoutf8(inputToken.split(".")[1]));
  
          /*
            jsrsasign library is being used to verify the iss, exp and aud of the JWT
          */
          var sJWT = KJUR.jws.JWS.sign("HS256", headerObj, payloadObj, clientSecret);
          var currentTimestamp = Date.now() / 1000 | 0;
          try {
            var isValid = KJUR.jws.JWS.verifyJWT(sJWT,clientSecret,
                                                 {alg: ['HS256'],
                                                  verifyAt: IntDate.get(currentTimestamp.toString()),
                                                  iss: ['https://samples.auth0.com/'],
                                                  aud: ['kbyuFDidLLm280LIwVFiazOqjO3ty8KH']});
          }
          catch(err) {
            res.status(403).json({ error: 'Token is incorrect/malformed' })
          }
          // iss, aud and exp verified
          
          // retreiving userinfo_endpoint via endpoint /tokeninfo
          if (isValid) {
            got('https://samples.auth0.com/tokeninfo?id_token='+inputToken, { json: true }).then(response => {
              res.status(200).json(response.body);
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



exports.returnBadRequest = function(req, res) {
  res.status(404).json({ error: 'API endpoint does not exists' });
};
