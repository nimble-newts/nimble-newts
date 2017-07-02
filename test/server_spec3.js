var request = require('request');
var expect = require('chai').expect;
var host = `http://localhost:3000`;

console.log(`Server needs to be started for tests to ensue...`);

describe('Server', function() {
  describe('/login', function () {
    it('should respond to GET requests to /login with a 200 status code', function(done) {
      request(host + `/login`, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it(`should respond to POST requests to /login w/ redirect object to /newUser if user doesn't exist`, function (done) {

    });
    // `185270765341213`;
    // var token = `EAALZAun8eadoBABZAXTEtaq1kTY7o1LumYU5YZC6SUfEr5YL4I7XxmtRUagZAxneWlz1KoWCmPyGpzCXZB1eNHQVFIMvXALIkl1nXOckYkXj2VzTWOyE0quSzrygH7S911ED7OiRZC1OpOgZAZC6XvUY7Kps1ZBMYGESPQR7X9uJTdQBjhZAMZBnj43OVpyC2WvxowZD`;
    
    xit(`should respond to POST requests to /login w/ redirect object to /search if user DOES exist`, function (done) {

    });
  });

  xdescribe(`/save`, function () {
    it(`should respond to POST requests to /save w/ updated friends`, function (done) {
      var request = {
        name: 'Victor',
        address: '500 Paris Street San Francisco'
      };
      var expected = `[{"name":"Victor","address":"833 Bryant St San Francisco"},{"name":"Victor","address":"500 Paris Street San Francisco"}]`;
    });
  });

  xdescribe(`/default`, function () {
    it(`should respond to POST requests to /default w/ redirect object if user doesn't exist`, function (done) {
      
    });
  });

  xdescribe(`/profile`, function () {
    it(`should respond to POST requests to /profile w/ stringified person object`, function (done) {

    });
  });
  
});