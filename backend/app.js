const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

var user = require('./models.js');

var counter = 0;
const server = http.createServer(async (req, res) => {
  counter++;
  console.log(req.url);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  let response = '';
  try {
    let users = await user.findAll()
    var allNames = '';
    for (let result of users) {
       allNames = allNames + result.lastName;
    }
    response = allNames;
  }
  catch(err) {
    response = err.stack;
  }
  res.end(response);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
