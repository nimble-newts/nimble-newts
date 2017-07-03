'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('../database/db.js');
var chai = require('chai');
var expect = chai.expect;

describe('MongoDB Test:', function() {
  
  before(function (done) {
    mongoose.connect('mongodb://localhost/users');
    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {
      console.log('Database connected!');
      done();
    });
  });

  describe('Check if database', function () {

    it('saves new user information', function(done) {
      var userInfo = User({
        name: 'Gideon', 
        defaultAddress: '944 Market St, San Francisco, CA 94102',
        friends: [
          {name: 'Me', address: '944 Market St, San Francisco, CA 94102'}, 
          {name: 'Myself', address: '944 Market St, San Francisco, CA 94102'}, 
          {name: 'I', address: '944 Market St, San Francisco, CA 94102'}
        ],
        suggestions: [
          {name: 'Philz Coffee', address: '201 Berry St, San Francisco, CA 94158'}, 
          {name: 'Library', address: '100 Larkin St. San Francisco, 94102'}, 
          {name: 'Krutsy Krab', address: '35 Powell St, San Francisco, CA 94102'}
        ]
      });

      userInfo.save(done);
    });

    it('retrieves new user information', function(done) {
      User.findOne({'name': 'Gideon'}, function (err, results) {
        if(err) {throw err;}
        console.log('hello', results);
        expect(results.defaultAddress).to.not.be.empty;
        expect(results.friends).to.not.be.empty;
        expect(results.suggestions).to.not.be.empty;        
        done();
      });
    });
  });

  after(function(done) {
    mongoose.connection.db.dropDatabase(function(){
      mongoose.connection.close(done);
    });
  });

});