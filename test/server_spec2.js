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

  // it('should accept PUT request to /friends', function(done) {
  //   var requestParams = {
  //     uri: 'http://localhost:3000/friends',
  //     json: {
  //       userID: '185270765341213',
  //       name: 'Victor',
  //       friends: [
  //         {name: 'Coffee', address: '10 4th St, San Francisco, CA 94103'}, 
  //         {name: 'Tea', address: '10 4th St, San Francisco, CA 94103'}, 
  //         {name: 'Milk', address: '10 4th St, San Francisco, CA 94103'}
  //       ]
  //     }
  //   };

  //   request(requestParams, function (err, res, body) {
  //     expect(res.statusCode).to.equal(200);
  //     done();
  //   })
  // })

  //  it('should accept POST request to /friends', function(done) {
  //   var requestParams = {
  //     method: 'POST',      
  //     uri: 'http://localhost:3000/friends',
  //     json: {
  //       userID: '185270765341213'
  //     }
  //   };

  //   request(requestParams, function (err, res, body) {
  //     console.log('body', (body));
  //     expect(body).to.not.be.empty;
  //     done();
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

  //Need previous test
  it('should return suggestions from /suggestions', function(done) {
    var requestParams = {
      method: 'POST',
      uri: 'http://localhost:3000/suggestions',
      json: {
        userID: '185270765341213',
        name: 'Gideons favorite',
        address: '136 Church St San Francisco, CA 94114',
        city: 'San Francisco',
        zip: '94114',
        url: 'https://www.yelp.com/biz/el-castillito-san-francisco-2'
      }
    };

    request(requestParams, function (err, res, body) {
      console.log(res);
      // console.log(body);
      done();
    })
  })

})
