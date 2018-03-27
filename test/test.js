'use strict';

const chai = require('chai');
const expect = require('chai').expect;

chai.use(require('chai-http'));

const app = require('../server.js'); // Our app

var correctToken = "Bearer {TOKEN}";

var incorrectToken = "Bear eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ.eyJlbWFpbCI6ImFsZXgrc2FtcGxlQGJsdWVjYW52YXMuaW8iLCJuYW1lIjoiYWxleCtzYW1wbGVAYmx1ZWNhbnZhcy5pbyIsInBpY3R1cmUiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci9iMmZjNGViYzAyNzQyNjAxZmIyZDAyMTAyZGIxZmJhYT9zPTQ4MCZyPXBnJmQ9aHR0cHMlM0ElMkYlMkZjZG4uYXV0aDAuY29tJTJGYXZhdGFycyUyRmFsLnBuZyIsIm5pY2tuYW1lIjoiYWxleCtzYW1wbGUiLCJhcHBfbWV0YWRhdGEiOnsiYXV0aG9yaXphdGlvbiI6eyJncm91cHMiOltdfX0sImF1dGhvcml6YXRpb24iOnsiZ3JvdXBzIjpbXX0sImdyb3VwcyI6W10sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJjbGllbnRJRCI6ImtieXVGRGlkTExtMjgwTEl3VkZpYXpPcWpPM3R5OEtIIiwidXBkYXRlZF9hdCI6IjIwMTgtMDMtMjZUMTk6MDY6MDkuNzE0WiIsInVzZXJfaWQiOiJhdXRoMHw1OTZmMjdjMmMzNzA5NjYxZTljZWEzN2QiLCJpZGVudGl0aWVzIjpbeyJ1c2VyX2lkIjoiNTk2ZjI3YzJjMzcwOTY2MWU5Y2VhMzdkIiwicHJvdmlkZXIiOiJhdXRoMCIsImNvbm5lY3Rpb24iOiJVc2VybmFtZS1QYXNzd29yZC1BdXRoZW50aWNhdGlvbiIsImlzU29jaWFsIjpmYWxzZX1dLCJjcmVhdGVkX2F0IjoiMjAxNy0wNy0xOVQwOTozNDo1OC4yMjlaIiwiaXNzIjoiaHR0cHM6Ly9zYW1wbGVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1OTZmMjdjMmMzNzA5NjYxZTljZWEzN2QiLCJhdWQiOiJrYnl1RkRpZExMbTI4MExJd1ZGaWF6T3FqTzN0eThLSCIsImlhdCI6MTUyMjA5MTE3NSwiZXhwIjoxNTIyMTI3MTc1fQ.t9tTcgZ5cchnjfgog-w3T0Rlb1L-lLPGY9LiftyDgqU";


describe('API endpoint /v1/verifyAccessToken', function() {
  this.timeout(5000); // How long to wait for a response (ms)

  before(function() {

  });

  after(function() {

  });

  // GET - Should return the test user alex+sample
  // Get unexpired token
  it('should return the test users', function() {
    return chai.request(app)
      .get('/v1/verifyAccessToken')
      .set('Authorization', correctToken)
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
      });
  });

  // GET - Should return a 403
  it('should return the test users', function() {
    return chai.request(app)
      .get('/v1/verifyAccessToken')
      .set('Authorization', incorrectToken)
      .then(function(res) {
        expect(res).to.have.status(403);
        expect(res).to.be.json;
      });
  });

  // POST - Bad Request
  it('should return Bad Request', function() {
    return chai.request(app)
      .post('/v1/verifyAccessToken')
      .send({
        data: 'data'
      })
      .then(function(res) {
        expect(res).to.have.status(404);
      });
  });

});
