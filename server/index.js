const bodyParser = require('body-parser');
const express = require('express');
const db = require('../database/db');
const User = db.User;
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('./'));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.redirect('../dist/index.html');
});
 
app.get('/test', (req, res) => {
  User.find({}, (err, docs) => {
    if (err) {
      console.error(err);
    } else {
      console.log(docs);
      res.json(docs);
    }
  });
});

app.post('/test', (req, res) => {
  /*
  USER SCHEMA
     user_name: 'VicAwesome',
    default_address: '123 Fake Street',
    friends: [],
    suggestions: [],
    access_token: 'Whooo',
    salt: 'Pepper!'
  */
  var user = new User(req.body);
  user.save(err => {
    if (err) {
      console.error(err);
    }
    res.send('Success!');
  });
});

app.listen(port, _ => {
  console.log(`Server connected to port number: ${port}`);
});