const express = require('express');
const router = express.Router();

var { User, Address, User_Address, Address_User} = require("../models.js");


router.get('/users/:userId/addresses/coordinates/', function (req, res) {
	let userId = req.params.userId;

	getById(User, userId).then(function(user) {
		user.getAddresses().then(function(addresses) {

			//what to do about multiple addresses? have a "current" tag?
			res.json({latitude: addresses[0].latitude,
					longitude: addresses[0].longitude});
		})
	});
});

router.get('/addresses', function(req, res){
	Address.findAll({
		include: [
			{
				model: User
			}
		]
	}).then((addresses) => {
		/*
		Multiple users can belong to a single address, but our frontend logic
		looks for a single User to display info for.
		
		Here we arbitrarily assign the first User associated with an Address as
		the user to display info about on the frontend.
		*/
		userAssignedAddresses = [];
		addresses.map((address, key) => {
			user = address.users[0];
			userAssignedAddresses.push({
				user: user,
				latitude: address.latitude,
				longitude: address.longitude,
			})
		})
		res.json(userAssignedAddresses);
	})
})

router.post('/createUser', function(req, res) {
	User.create(req.body);
})

router.post('/createAddress', function(req, res) {
	let data = req.body
	User.findOrCreate(
		{
			where:{email: data.email},
			defaults:{
				firstName: data.firstName,
				lastName: data.lastName,
				batch: data.batch,
				social: data.social,
				tech: data.tech,
				stay: data.stay
			}
		}
	).spread((user, created) => {
		Address.create({
			current: data.current,
			latitude: data.latitude,
			longitude: data.longitude
		})
		.then((address) => {
			address.addUser(user)
			.then((result) => {
				res.json(result);
			})
		})
		.catch((err) => {console.log(err)})
	})
})


router.get('/users', function (req, res) {
	User.findAll().then(function(users) {
		res.json(users);
	});
});

module.exports = router;
// app.listen(port, () => console.log(`Serving on port ${port}.`))
