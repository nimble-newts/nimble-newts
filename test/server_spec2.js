var chai = require('chai');
var request = require('request');
var expect = chai.expect;


describe('server', function() {

  it('should respond to GET request for /login with a 200 status code', function(done) {
    request('http://localhost:3000/*', function (err, res, body) {
      expect(res.statusCode).to.equal(200);
      done();
    })
  })

  // it('should accept POST request to /friends', function(done) {
  //   var requestParams = {
  //     uri: 'http://localhost:3000/friends',
  //     json: {
  //       userID: '185270765341213',
  //       name: 'Gideon',
  //       address: '944 Market Street, 8th floor, San Francisco, CA 94102'
  //     }
  //   };

  //   var requestParams2 = {
  //     method: 'POST',
  //     uri: 'http://localhost:3000/friends',
  //     json: {
  //       userID: '185270765341213'
  //     }
  //   };

  //   request(requestParams, function (err, res, body) {
  //     expect(res.statusCode).to.equal(200);
  //     request(requestParams2, function (err, res, body) {
  //       console.log(JSON.parse(body))
  //       done();
  //     })
  //     // done();
  //   })
  // })

  it('searches yelp API', function (done) {
    var requestParams = {
      method: 'POST',
      uri: 'http://localhost:3000/searches',
      json: {
        searchText: 'taco',
        address: '944 Market Street, 8th floor, San Francisco, CA 94102'
      }
    };

    request(requestParams, function (err, res, body) {
      expect(res.statusCode).to.equal(200);
      expect(body).to.not.be.empty;
      done();
    })
  })
})