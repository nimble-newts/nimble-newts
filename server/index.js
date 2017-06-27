var bodyParser = require('body-parser');
var express = require('express');
var User = require('../database/db.js');
var path = require('path');
var request = require('request');
var token = process.env.YELP_ACCESS_TOKEN;
console.log('Uh oh, heres your token: ', token);
console.log('HEres your port #', process.env.port);
console.log('Heres the environmental vars', process.env);

var app = express();
var port = process.env.PORT || 3000;

app.use(express.static('./'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/../dist')));

app.post('/login', function(req, res) {
  var res = res;
  var userID = req.body.userID;
  var token = req.body.token;
  User.findOne({ 'id': userID }, function(err, person) {
    if (err) { return err; }

    if (person === null) {
      request('https://graph.facebook.com/' + userID + '?fields=name,picture&access_token=' + token, function(err, response, body) {
        body = JSON.parse(body);
        console.log('creating new user: ', userID);
        var user = new User({ 'id': userID, 'photoUrl': body.picture.data.url, 'name': body.name });
        user.save(function(err, saved) {
          if (err) { return err; }
          res.send({ redirect: '/search' });
        });
      });
    } else {
      console.log('already exists!');
      res.send({ redirect: '/search' });
    }
  });
});

app.post('/save', function(req, res) {
  var newFriend = {};
  newFriend.name = req.body.name;
  newFriend.address = req.body.address;
  console.log('saving friend:', newFriend);
  User.findOne({ 'id': req.body.userID }, function(err, person) {
    if (err) { return err; }
    if (person === null) { console.log('error: no user found'); return; }
    
    person.friends.push(newFriend);
    person.save(function(err, updated) {
      res.send(updated.friends);
    });
  });
});

app.post('/default', function(req, res) {
  var defaultAddress = req.body.defaultAddress;
  console.log('saving default address:', defaultAddress);
  User.findOne({ 'id': req.body.userID }, function(err, person) {
    if (err) { return err; }
    if (person === null) { console.log('error: no user found'); return; }
    
    person.defaultAddress = defaultAddress;
    person.save(function(err, updated) {
      res.send(updated.defaultAddress);
    });
  });
});

app.post('/profile', function(req, res) {
  User.findOne({ 'id': req.body.userID }, function(err, person) {
    if (err) { return err; }
    res.send(JSON.stringify(person));
  });
});

app.put('/friends', function(req, res) {
  let targetName = req.body.name;
  let targetAddress = req.body.address;
  User.findOne({ 'id': req.body.userID }, function(err, person) {
    if (err) { return err; }
    let deleted = false;
    let index = 0;
    while (!deleted) {
      if (person.friends[index].name === targetName && person.friends[index].address === targetAddress) {
        person.friends.splice(index, 1);
        deleted = true;
      }
      index++;
    }
    person.save(function(err, saved) {
      res.send(person.friends);
    });
  });
});

app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/../dist/index.html'));
});

app.post('/searches', function (req, res) {
  var search = req.body.searchText;
  var address = req.body.address;

  var respOptions = {
    url: `https://api.yelp.com/v3/businesses/search?term=${search}&location=${address}&radius=4023&limit=10`,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  let body = '';
  request(respOptions, (err, response, body) => {
    if (err) { throw err; }
    body = JSON.parse(body);
    console.log(body);
    res.send(body);
  });
});
 
app.listen(port, _ => {
  console.log(`Server connected to port number: ${port}`);
});