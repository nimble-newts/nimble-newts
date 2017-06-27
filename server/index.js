var bodyParser = require('body-parser');
var express = require('express');
var User = require('../database/db.js');
var path = require('path');
var request = require('request');

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
        var user = new User({ 'id': userID, 'photo_url': body.picture.data.url, 'name': body.name });
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
  let newFriend = {};
  newFriend.name = req.body.name;
  newFriend.address = req.body.address
  console.log('saving friend:', newFriend);
  User.findOne({ 'id': req.body.userID }, function(err, person) {
    if (err) { return err; }
    if (person === null) { console.log('error: no user found'); return; }
    
    person.friends.push(newFriend);
    person.save(function(err, updated) {
      res.send(updated);
    })
  });
})

app.post('/profile', function(req, res) {
  User.findOne({ 'id': req.body.userID }, function(err, person) {
    if (err) { return err; }
    res.send(JSON.stringify(person));
  });
})

app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/../dist/index.html'));
});
 
app.listen(port, _ => {
  console.log(`Server connected to port number: ${port}`);
});