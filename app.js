// TODO: Why can't we use "import" instead of require?

var { User, Address } = require("./models.js");

const cors = require('cors')
const express = require('express')
const app = express();
const port = 4000;

app.use(cors())

app.get('/addresses', function(req, res){
	Address.findAll().then(function(addresses) {
		res.json(addresses);
	});
});

app.get('/users', function (req, res) {
	User.findAll().then(function(users) {
		res.json(users);
	});
});

//app.use(express.static('static'));

app.listen(port, () => console.log(`Serving on port ${port}.`))
