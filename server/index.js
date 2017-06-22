var express = require('express')
var app = express()
 
<<<<<<< 87d5de3dcd2073fb8f5ff5b12575b5acb255ae52
var port = process.env.PORT || 3000;
=======
var port = 3000;
>>>>>>> Add basic express server.
app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.listen(port, _ => {
	console.log(`Server connected to port number: ${port}`)
});