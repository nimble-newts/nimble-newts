const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('./'));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.redirect('../dist/index.html');
});
 
app.listen(port, _ => {
	console.log(`Server connected to port number: ${port}`);
});