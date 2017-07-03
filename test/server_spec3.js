var database = require('../database/db.js');
var mongoose = require('mongoose');
var request = require('request');
var expect = require('chai').expect;
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

  describe('/login', function () {

    it('should respond to GET requests to /login with a 200 status code', function(done) {
      request(`http://localhost:3000/login`, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it(`should respond to POST requests to /login w/ redirect object to /search if user exists`, function (done) {
      var userId = `k8329239493e9238r2398tu23tu`;
      var token = `jfkwklekejwfljewlkjfjktett3tkmmcmmslajellkkfwejfwllbme2mnltfafagsdfcwysaqcwfwcqfywql`;
      var options = {
        url: host + '/login',
        method: 'post',
        json: {
          userID: userId,
          token: token
        }
      };

      request(options, function (err, response, body) {
        request(options, function (err, response, body) {
          expect(body).to.deep.equal({ redirect: '/search' });
          done();
        });
      });
    });
    
    it(`should respond to POST requests to /login w/ redirect object to /search if user DOES NOT exist`, function (done) {
      var userId = `k8329239493e9238r2398tu23tu`;
      var token = `jfkwklekejwfljewlkjfjktett3tkmmcmmslajellkkfwejfwllbme2mnltfafagsdfcwysaqcwfwcqfywql`;
      var options = {
        url: host + '/login',
        method: 'post',
        json: {
          userID: userId,
          token: token
        }
      };

      request(options, function (err, response, body) {
        expect(body).to.deep.equal({ redirect: '/newUser' });
        done();
      });

    });
  });

  describe(`/save`, function () {

    it(`should respond to POST requests to /save w/ updated friends`, function (done) {
      var userId = `k8329239493e9238r2398tu23tu`;
      var token = `jfkwklekejwfljewlkjfjktett3tkmmcmmslajellkkfwejfwllbme2mnltfafagsdfcwysaqcwfwcqfywql`;
      var loginOptions = {
        url: host + '/login',
        method: 'post',
        json: {
          userID: userId,
          token: token
        }
      };

      var options = {
        url: host + '/save',
        method: 'post',
        json: {
          userID: userId,
          name: 'Victor',
          address: '500 Paris Street San Francisco'
        }
      };

      var expected = `[{"name":"Victor","address":"500 Paris Street San Francisco"}]`;

      request(loginOptions, function (err, response, body) {
        request(options, function (err, response, body) {
          expect(body).to.deep.equal(JSON.parse(expected));
          done();
        });
      });

    });

  });

  describe(`/default`, function () {
    it(`should respond to POST requests to /default w/ default address string if default address is being set`, function (done) {
      var userId = `k8329239493e9238r2398tu23tu`;
      var token = `jfkwklekejwfljewlkjfjktett3tkmmcmmslajellkkfwejfwllbme2mnltfafagsdfcwysaqcwfwcqfywql`;
      var loginOptions = {
        url: host + '/login',
        method: 'post',
        json: {
          userID: userId,
          token: token
        }
      };
      
      var options = {
        url: host + '/default',
        method: 'post',
        json: {
          userID: userId,
          name: 'Victor',
          defaultAddress: '500 Paris Street San Francisco'
        }
      };

      request(loginOptions, function (err, response, body) {
        request(options, function (err, response, body) {
          expect(body).to.equal(`500 Paris Street San Francisco`);
          done();
        });
      });
    });
  });

  describe(`/profile`, function () {
    it(`should respond to POST requests to /profile w/ stringified person object`, function (done) {
      var userId = `k8329239493e9238r2398tu23tu`;
      var token = `jfkwklekejwfljewlkjfjktett3tkmmcmmslajellkkfwejfwllbme2mnltfafagsdfcwysaqcwfwcqfywql`;
      var loginOptions = {
        url: host + '/login',
        method: 'post',
        json: {
          userID: userId,
          token: token
        }
      };
      
      var options = {
        url: host + '/profile',
        method: 'post',
        json: {
          userID: userId,
          name: 'Victor',

        }
      };

      request(loginOptions, function (err, response, body) {
        request(options, function (err, response, body) {
          expect(body).to.be.a('object');
          done();
        });
      });

    });
  });
  
});