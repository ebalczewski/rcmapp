const express = require('express');
const router = express.Router();
var { User, Address, Token, Preference, sequelize} = require("../models.js");

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

router.post('/preferences', authenticate, (req, res) => {
	let data = req.body;
	Preference.create({
		social: data.social,
		tech: data.tech,
		stay: data.stay,
	})
	.then((preference) => {
		preference.setUser(data.userId)    
		res.json(preference);
	})
	.catch((err) => {
		console.log(err)
	})
});

router.post('/users', authenticate, (req, res) => {
	User.create(req.body);
});

/* "SELECT userId, addressId, users.preferenceId, users.firstName, users.lastName, preferences.tech, preferences.social, preferences.stay FROM UserAddress LEFT JOIN users ON users.id=UserId LEFT JOIN preferences ON preferences.id=users.preferenceId" */

router.get('/addresses', authenticate, (req, res) => {
	sequelize.query(
		"SELECT userId, addressId, users.preferenceId, users.firstName, users.lastName, users.email,  preferences.tech, preferences.social, preferences.stay, addresses.latitude, addresses.longitude FROM UserAddress LEFT JOIN users ON users.id=UserId LEFT JOIN preferences ON preferences.id=users.preferenceId LEFT JOIN addresses ON addresses.id=addressId", 
		{type: sequelize.QueryTypes.SELECT}
	).then(results => {
		res.json(results);
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