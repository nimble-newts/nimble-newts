const bodyParser = require('body-parser');
const express = require('express');
const db = require('../database/db');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('./'));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/../dist')));

app.get('/login', function(req, res) {
  res.send({ redirect: '/search' });
});

app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/../dist/index.html'));
});
 
app.listen(port, _ => {
  console.log(`Server connected to port number: ${port}`);
});