const express = require('express');
const router = express.Router();

var { User, Address, Token } = require("../models.js");

function authenticate (req, res, next) {
	if (req.cookies) {
		Token.findById(req.cookies.token)
		.then(row => 
			{
				const currentTime = new Date();
				if (currentTime < row.expiration) {
					next();
				} else {
					res.clearCookie('token');
					res.redirect('/login');
				}
			})
		.catch(err => {
			console.log(err);
			res.clearCookie('token');
			res.redirect('/login');
		})
	} else {
		res.redirect('/login');
	}
}

router.get('/users', authenticate, (req, res) => {
	User.findAll().then(function(users) {
		res.json(users);
	});
});

router.post('/users', authenticate, (req, res) => {
	User.create(req.body);
});

router.get('/addresses', authenticate, (req, res) => {
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

router.post('/addresses', authenticate, (req, res) => {
	let data = req.body;
	Address.create({
		current: data.current,
		latitude: data.latitude,
		longitude: data.longitude,
	})
	.then((address) => {
		address.addUser(data.userId)
		res.json(address);
	})
	.catch((err) => {
		console.log(err)
	})
})

router.put('/addresses/:addressId', authenticate, (req, res) => {
	let addressId = req.params.addressId;
	Address.findById(addressId).then(address => {
		address.update(req.body)
		.then(() => {
			res.json({'success': true});
		})
	})
})

router.delete('/addresses/:addressId', authenticate, (req, res) => {
	let addressId = req.params.addressId;
	Address.findById(addressId).then(address => {
		address.destroy()
		.then(() => {
			res.json({'success': true});
		})
	})
})

module.exports = router;