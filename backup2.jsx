const bodyParser = require('body-parser');
const express = require('express');
const db = require('../database/db');
const path = require('path');
const request = require('request');
const token = require('./token');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('./'));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/../dist')));

app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/../dist/index.html'));
});

app.post('/searches', function (req, res) {
  var search = req.body.searchText;
  var address = req.body.address;

  const respOptions = {
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
  // .on('data', (data) => {
  //   body += data;
  // }).on('end', () => {
  //   body = JSON.parse(body);
  //   res.end(JSON.stringify(body));
  // }).on('err', () => {
  //   res.end();
  // });
});
 
app.listen(port, _ => {
  console.log(`Server connected to port number: ${port}`);
});