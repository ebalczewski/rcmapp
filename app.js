const express = require('express')
const app = express();
const port = 3000;

var user = require('./models.js');

app.get('/users', function (req, res) {
	user.findAll().then(function(users) {
		var allNames = '';
		for (let result of users) {
			allNames = allNames + result.lastName;
		}
		res.send(allNames);
	});
});

app.use(express.static('static'));

app.listen(port, () => console.log(`Serving on port ${port}.`))
