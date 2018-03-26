# bluecanvaspriveligedapi


Build a API server that accepts requests authorized by the OpenID Connect (OAuth 2.0) identity provider https://samples.auth0.com/.

Note: Auth0 made a change to their endpoints since we wrote this challenge. They still have the old /tokeninfo endpoint (https://auth0.com/docs/api/authentication#get-token-info) which accepts the format used in the examples.

The API should accept an access token in the Authorization request header and verify the claims iss, aud, and exp. If successful, the API should retrieve the user profile from the OIDC userinfo_endpoint and return the user profile in the response. If failed, the API should return an appropriate HTTP error with helpful details (but no login page redirects).

You can use the test harness at https://openidconnect.net/ to issue access tokens for testing. The harness is preconfigured for https://samples.auth0.com/.
