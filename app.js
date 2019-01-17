// TODO: Why can't we use "import" instead of require?

var { User, Address } = require("./models.js");

const cors = require('cors')
const express = require('express')
const app = express();
const port = 4000;

app.use(cors())
app.use(express.json());

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
};

// curl -d '{"MyKey":"My Value"}' -H "Content-Type: application/json" http://127.0.0.1:4000/users

app.post('/createUser', function(req, res) {
	User.create(req.body);
})

app.get('/users/:userId/addresses/coordinates/', function (req, res) {
	let userId = req.params.userId;

	getById(User, userId).then(function(user) {
		user.getAddresses().then(function(addresses) {

			//what to do about multiple addresses? have a "current" tag?
			res.json({latitude: addresses[0].latitude, 
					longitude: addresses[0].longitude});
		})
	});
});


//latitudes and longitudes within a range
//everything by user
//user preferences

//app.use(express.static('static'));

app.listen(port, () => console.log(`Serving on port ${port}.`))
