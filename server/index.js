var express = require('express')
var app = express()
 
var port = 3000;
app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.listen(port, _ => {
	console.log(`Server connected to port number: ${port}`)
});