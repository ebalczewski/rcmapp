// TODO: Why can't we use "import" instead of require?

var { User, Address } = require("./models.js");

const cors = require('cors')
const express = require('express')
const app = express();
const port = 4000;

app.use(cors())
app.use(express.json());


//Endpoints
// Get user by email
// Get user by address
// Get addresses by coordinates in a range
// Add user
// Add address
// Add preferences


// Get user by email
function getByEmail(email) {
	return User.findOne({
		where: {
			email: email
		}
	})
};

app.get('/users/:userEmail', function(req, res) {
	let userEmail = req.params.userEmail;
	getByEmail(userEmail).then(function(user) {
		res.json({firstName: user.firstName, 
				email: user.email});
	});
});


// curl -d '{"MyKey":"My Value"}' -H "Content-Type: application/json" http://127.0.0.1:4000/users
app.post('/addAddress', function(req, res) {
	Address.create(req.body);
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


// function getById(model, id) {
// 	return model.findOne({
// 		where: {
// 			id: id
// 		}
// 	})
// };

// app.get('/addresses', function(req, res){
// 	Address.findAll().then(function(addresses) {
// 		res.json(addresses);
// 	});
// });

// app.get('/users', function (req, res) {
// 	User.findAll().then(function(users) {
// 		res.json(users);
// 	});
// });

app.listen(port, () => console.log(`Serving on port ${port}.`))
