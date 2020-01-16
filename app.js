const express = require('express');
const app = express();

// serve files from the public directory
app.use(express.static('public'));

// start the express web server listening on 8080
app.listen(8080, () => {
  console.log('listening on 8080');
});

// serve the homepage
app.get('/', (req, res) => {
	// console.log("ho")
  res.sendFile(__dirname + '/index.html');
  // var domain = req.headers.host
	// console.log(domain)
});
