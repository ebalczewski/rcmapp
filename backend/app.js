const http = require('http');
const fs = require('fs');
const hostname = '127.0.0.1';
const port = 3000;
const html = fs.readFileSync("../frontend/index.html")
var user = require('./models.js');

//var counter = 0;
// const server = http.createServer(async (req, res) => {
//   //counter++;
//   console.log(req.url);
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');

//   let response = '';
//   try {
//     let users = await user.findAll()
//     var allNames = '';
//     for (let result of users) {
//        allNames = allNames + result.lastName;
//     }
//     response = allNames;
//   }
//   catch(err) {
//     response = err.stack;
//   }
//   res.end(response);
// });

async function getUserInfo() {
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
  return response
}

const server = http.createServer(async (req, res) => {
  if (req.url === "/users") {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(await getUserInfo());
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
  }

})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
