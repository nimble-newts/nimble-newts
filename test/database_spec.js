'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var database = require('../database/db.js');
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

  describe('Check if database correctly', function () {

    it('saves new user information', function(done) {
      var userInfo = database({
        name: 'Bleh', 
        defaultAddress: '944 Market St, San Francisco, CA 94102',
        friends: [
          {name: 'Jennifer', address: 'Chinatown'}, 
          {name: 'Victor', address: 'Daly City'}, 
          {name: 'Patrick', address: 'Bikini Bottom'}
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
      var defaultAddress = {defaultAddress: '944 Market St, San Francisco, CA 94102'};
      
      var friends = 
        {friends: [
          {name: 'Jennifer', address: 'Chinatown'}, 
          {name: 'Victor', address: 'Daly City'}, 
          {name: 'Patrick', address: 'Bikini Bottom'}
        ]};
      var suggestions = 
        {suggestions: [
          {name: 'Philz Coffee', address: '201 Berry St, San Francisco, CA 94158'}, 
          {name: 'Library', address: '100 Larkin St. San Francisco, 94102'}, 
          {name: 'Krutsy Krab', address: '35 Powell St, San Francisco, CA 94102'}
        ]};
      
      database.find(defaultAddress, function (err, defaultAddress) {
        if(err) {throw err;}
        if(defaultAddress.length === 0) {throw new Error('No default_address found!');}
        done();
      });

      database.find(friends, function (err, friends) {
        if(err) {throw err;}
        if(friends.length === 0) {throw new Error('No friends found!');}
        done();
      });

      database.find(suggestions, function (err, suggestions) {
        console.log(`Suggestions: ${suggestions}`);
        if(err) {throw err;}
        if(suggestions.length === 0) {throw new Error('No saved suggestions found!');}
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