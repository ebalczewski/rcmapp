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

function getById(model, id) {
	return model.find({
		where: {
			id: id
		}
	})
}

app.get('/users/:userId/addresses/coordinates/', function (req, res) {
	let userId = req.params.userId;

	getById(User, userId).then(function(user) {
		user.getAddresses().then(function(addresses) {
			res.json({latitude: addresses[0].latitude, 
					longitude: addresses[0].longitude});
		})
	});
});


//latitudes and longitudes within a range
//

//app.use(express.static('static'));

app.listen(port, () => console.log(`Serving on port ${port}.`))
