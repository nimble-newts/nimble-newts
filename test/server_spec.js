var database = require('../database/db.js');
var mongoose = require('mongoose');
var request = require('request');
var chai = require('chai');
var expect = chai.expect;
var host = `http://localhost:3000`;

describe('Server', function() {

  before(function (done) {
    mongoose.connect('mongodb://localhost/users');
    var db = mongoose.connection;

    db.on('error', function (err) {
      console.error.bind(console, 'connection error');
    });

    db.once('open', function() {
      console.log('Opened database...');
      done();
    });

  });

  beforeEach(function (done) {
    mongoose.connection.db.dropDatabase(function(){
      done();
    });
  });

  describe('request to /login', function () {

    it('should respond to GET requests with a 200 status code', function(done) {
      request(`${host}/login`, function(err, res, body) {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });

    it(`should respond to POST requests with redirect object to /search if user exists`, function (done) {
      var userId = `k8329239493e9238r2398tu23tu`;
      var token = `jfkwklekejwfljewlkjfjktett3tkmmcmmslajellkkfwejfwllbme2mnltfafagsdfcwysaqcwfwcqfywql`;
      var options = {
        uri: host + '/login',
        method: 'POST',
        json: {
          userID: userId,
          token: token
        }
      };

      request(options, function (err, res, body) {
        request(options, function (err, res, body) {
          expect(body).to.deep.equal({ redirect: '/search' });
          done();
        });
      });
    });
    
    it(`should respond to POST requests to with redirect object to /search if user DOES NOT exist`, function (done) {
      var userId = `k8329239493e9238r2398tu23tu`;
      var token = `jfkwklekejwfljewlkjfjktett3tkmmcmmslajellkkfwejfwllbme2mnltfafagsdfcwysaqcwfwcqfywql`;
      var options = {
        uri: host + '/login',
        method: 'POST',
        json: {
          userID: userId,
          token: token
        }
      };

      request(options, function (err, res, body) {
        expect(body).to.deep.equal({ redirect: '/newUser' });
        done();
      });

    });
  });

  describe(`request to /save`, function () {

    it(`should respond to POST requests with updated friends`, function (done) {
      var userId = `k8329239493e9238r2398tu23tu`;
      var token = `jfkwklekejwfljewlkjfjktett3tkmmcmmslajellkkfwejfwllbme2mnltfafagsdfcwysaqcwfwcqfywql`;
      var loginOptions = {
        method: 'POST',
        uri: host + '/login',
        json: {
          userID: userId,
          token: token
        }
      };

      var options = {
        method: 'POST',
        uri: host + '/save',
        json: {
          userID: userId,
          name: 'Victor',
          address: '500 Paris Street San Francisco'
        }
      };

      var expected = `[{"name":"Victor","address":"500 Paris Street San Francisco"}]`;

      request(loginOptions, function (err, res, body) {
        request(options, function (err, res, body) {
          expect(body).to.deep.equal(JSON.parse(expected));
          done();
        });
      });

    });

  });

  describe(`request to /default`, function () {
    it(`should respond to POST requests with default address string if default address is being set`, function (done) {
      var userId = `k8329239493e9238r2398tu23tu`;
      var token = `jfkwklekejwfljewlkjfjktett3tkmmcmmslajellkkfwejfwllbme2mnltfafagsdfcwysaqcwfwcqfywql`;
      var loginOptions = {
        uri: host + '/login',
        method: 'POST',
        json: {
          userID: userId,
          token: token
        }
      };
      
      var options = {
        uri: host + '/default',
        method: 'POST',
        json: {
          userID: userId,
          name: 'Victor',
          defaultAddress: '500 Paris Street San Francisco'
        }
      };

      request(loginOptions, function (err, res, body) {
        request(options, function (err, res, body) {
          expect(body).to.equal(`500 Paris Street San Francisco`);
          done();
        });
      });
    });
  });

  describe(`request to /profile`, function () {
    it(`should respond to POST requests with stringified person object`, function (done) {
      var userId = `k8329239493e9238r2398tu23tu`;
      var token = `jfkwklekejwfljewlkjfjktett3tkmmcmmslajellkkfwejfwllbme2mnltfafagsdfcwysaqcwfwcqfywql`;
      var loginOptions = {
        uri: host + '/login',
        method: 'POST',
        json: {
          userID: userId,
          token: token
        }
      };
      
      var options = {
        uri: host + '/profile',
        method: 'POST',
        json: {
          userID: userId,
          name: 'Victor',

        }
      };

      request(loginOptions, function (err, res, body) {
        request(options, function (err, res, body) {
          expect(body).to.be.a('object');
          done();
        });
      });

    });
  });

  describe(`request to`, function () {
    it('/* should respond to GET request with a 200 status code', function(done) {
      request(`${host}/*`, function (err, res, body) {
        expect(res.statusCode).to.equal(200);
        done();
      })
    })

    it('page that doesnt exist should respond to GET request with a 200 status code', function(done) {
      request(`${host}/blankpage`, function (err, res, body) {
        expect(res.statusCode).to.not.equal(404);
        expect(res.statusCode).to.equal(200);        
        done();
      })
    })

  });

  describe(`request to /friends`, function () {
    it('should respond to PUT request and delete selected friends', function(done) {
      var userId = `k8329239493e9238r2398tu23tu`;
      var token = `jfkwklekejwfljewlkjfjktett3tkmmcmmslajellkkfwejfwllbme2mnltfafagsdfcwysaqcwfwcqfywql`;

      var loginOptions = {
        method: 'POST',
        uri: host + '/login',
        json: {       
          userID: userId,
          token: token     
        }
      }

      var saveOptions = {
        method: 'POST',
        uri: host + '/save',
        json: {
          userID: userId, 
          name: 'Victor', 
          address: '10 4th St, San Francisco, CA 94103'
        }
      };

      var options = {
        method: 'PUT',
        uri: host + '/friends',
        json: {
          userID: userId,
          name: 'Victor', 
          address: '10 4th St, San Francisco, CA 94103'
        }
      }

      var checkOptions = {
        method: 'POST',
        uri: host + '/profile',
        json: {       
          userID: userId
        }
      }
      
      request(loginOptions, function (err, res, body) {
        request(saveOptions, function (err, res, body) {
          request(options, function (err, res, body) {
            request(checkOptions, function(err, res, body) {
              expect(body.friends).to.be.empty;
              done();
            })
          })
        })
      })
    })

  });

  describe(`request to /searches`, function () {
    it('searches yelp API', function (done) {
      var options = {
        method: 'POST',
        uri: 'http://localhost:3000/searches',
        json: {
          searchText: 'taco',
          address: '944 Market Street, 8th floor, San Francisco, CA 94102'
        }
      };

      request(options, function (err, res, body) {
        expect(res.statusCode).to.equal(200);
        expect(body).to.not.be.empty;
        done();
      })
    })
  });

  describe(`request to /suggestions`, function () {
    it('should respond to PUT request and delete selected friends', function(done) {
      var userId = `k8329239493e9238r2398tu23tu`;
      var token = `jfkwklekejwfljewlkjfjktett3tkmmcmmslajellkkfwejfwllbme2mnltfafagsdfcwysaqcwfwcqfywql`;

      var loginOptions = {
        method: 'POST',
        uri: host + '/login',
        json: {       
          userID: userId,
          token: token     
        }
      }

      var saveOptions = {
        method: 'POST',
        uri: host + '/save',
        json: {
          userID: userId, 
          name: 'Best Burrito', 
          address: '136 Church St San Francisco, CA 94114'
        }
      };

      var options = {
        method: 'PUT',
        uri: host + '/suggestions',
        json: {
          userID: userId,
          name: 'Best Burrito', 
          address: '136 Church St San Francisco, CA 94114'
        }
      }

      var checkOptions = {
        method: 'POST',
        uri: host + '/profile',
        json: {       
          userID: userId
        }
      }
      
      request(loginOptions, function (err, res, body) {
        request(saveOptions, function (err, res, body) {
          request(options, function (err, res, body) {
            request(checkOptions, function(err, res, body) {
              console.log(body.suggestions)
              expect(body.suggestions).to.be.empty;
              done();
            })
          })
        })
      })
    })
  });

  after(function(done) {
    mongoose.connection.db.dropDatabase(function(){
      mongoose.connection.close(done);
    });
  });

})
