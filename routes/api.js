const express = require('express');
const router = express.Router();
var { User, UserInfo} = require("../models.js");

function authenticate (req, res, next) {
	next();
	// if (req.cookies) {
	// 	Token.findById(req.cookies.token)
	// 	.then(row => {
	// 		console.log(row.email, req.cookies.userEmail);
	// 		const currentTime = new Date();
	// 		if (currentTime < row.expiration && row.email === req.cookies.userEmail) {
	// 			next();
	// 		} else {
	// 			res.clearCookie('token');
	// 			res.redirect('/login');
	// 		}
	// 	})
	// 	.catch(err => {
	// 		console.log(err);
	// 		res.clearCookie('token');
	// 		res.redirect('/login');
	// 	})
	// } else {
	// 	res.redirect('/login');
	// }
}

router.get('/user_info', authenticate, (req, res) => {
	UserInfo.findAll().then(results => {
		res.json(results);
	})
	.catch(err => {
		res.end(err);
	})
})

router.post('/user_info', authenticate, (req, res) => {
	UserInfo.create(req.body).then(() => {
		res.json({success: true})
	}).catch(err => {
		res.end(err);
	})
})

router.put('/user_info/:email', authenticate, (req, res) => {
	UserInfo.find({where: {email: req.params.email}})
	.then(userInfo => {
		userInfo.update(req.body);
		res.json({success: true})
	}).catch(err => {
		res.end(err);
	})
})

router.get('/user_info/:email', authenticate, (req, res) => {
	UserInfo.find({where: {email: req.params.email}})
	.then(userInfo => {
		res.json(userInfo);
	}).catch(err => {
		res.end(err);
	})
})

router.delete('/user_info/:email', authenticate, (req, res) => {
	UserInfo.find({where: {email: req.params.email}})
	.then(userInfo => {
		userInfo.destroy()
		.then(() => {
			res.json({success: true})
		})
		.catch(err => {
			res.end(err);
		})
	}).catch(err => {
		res.end(err);
	})
})

module.exports = router;