var bodyParser = require('body-parser');
var express = require('express');
var User = require('../database/db.js');
var path = require('path');
var request = require('request');
var token = process.env.YELP_ACCESS_TOKEN;

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
  console.log(`Logging in...userId: ${userID}`);
  User.findOne({ 'id': userID }, function(err, person) {
    if (err) { return err; }

    if (person === null) {
      request('https://graph.facebook.com/' + userID + '?fields=name,picture&access_token=' + token, function(err, response, body) {
        body = JSON.parse(body);
        var user = new User({ 'id': userID, 'photoUrl': body.picture.data.url, 'name': body.name });
        user.save(function(err, saved) {
          if (err) { return err; }
          res.send({ redirect: '/newUser' });
        });
      });
    } else {
      console.log('user already exists!');
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
  var get = req.body.get;
  User.findOne({ 'id': req.body.userID }, function(err, person) {
    if (err) { return err; }
    if (person === null) { console.log('error: no user found'); return; }

    if (get === true) {
      console.log('returning info!'); 
      var sendDefault = person.defaultAddress || '';
      res.send(sendDefault); 
    } else {  
      console.log('saving default address:', defaultAddress);
      person.defaultAddress = defaultAddress;
      person.save(function(err, updated) {
        res.send(updated.defaultAddress);
      });
    }
  });
});

app.post('/profile', function(req, res) {
  User.findOne({ 'id': req.body.userID }, function(err, person) {
    if (err) { return err; }
    res.send(JSON.stringify(person));
  });
});

app.post('/friends', function(req, res) {

  User.findOne({ 'id': req.body.userID }, function(err, person) {
    if (err) { return err; }
    res.send(person.friends);
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

app.post('/searches', function(req, res) {
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
    res.send(body);
  });
});

app.post('/suggestions', function(req, res) {
  console.log('saving location:', req.body.name);
  let locInfo = {
    name: req.body.name,
    address: req.body.address,
    city: req.body.city,
    zip: req.body.zip,
    url: req.body.url
  };

  User.findOne({ 'id': req.body.userID }, function(err, person) {
    if (err) { return err; }
    if (person === null) { console.log('error: no user found'); return; }

    person.suggestions.push(locInfo);
    person.save(function(err, updated) {
      res.send(updated);
    });
  });
});

app.put('/suggestions', function(req, res) {
  console.log('removing location:', req.body.name);
  User.findOne({ 'id': req.body.userID }, function(err, person) {
    if (err) { return err; }
    if (person === null) { console.log('error: no user found'); return; }

    let removeIndex = 0;
    person.suggestions.forEach((suggestion, index) => {
      if (suggestion.name === req.body.name && suggestion.address === req.body.address) {
        removeIndex = index;
      }
    });
    person.suggestions.splice(removeIndex, 1);
    person.save(function(err, updated) {
      res.send(updated);
    });
  });
});

app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/../dist/index.html'));
});
 
app.listen(port, _ => {
  console.log(`Server connected to port number: ${port}`);
});

// when user gets authenticated in
  // user is redirected to search page
  // there should be a popup on top of the page
  // popup should show user how to use the app
  // user can close the popup to carry on with using the app