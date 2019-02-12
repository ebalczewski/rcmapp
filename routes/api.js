const express = require('express');
const router = express.Router();
var { User, UserInfo} = require("../models.js");

function authenticate (req, res, next) {
	if (req.cookies) {
		User.findById(req.cookies.token).then(user => {
			if (user !== null) {
				const currentTime = new Date();
				if (currentTime < user.expiration && user.email === req.cookies.email) {
					next();
				} else {
					invalidLogin(res);
				}
			} else {
				invalidLogin(res);
			}
		}).catch(err => {
			console.log(err);
		})
	} else {
		res.redirect('/login');
	}
}

function invalidLogin(res) {
	res.clearCookie('token');
	res.redirect('/login');
}

function checkOwnership (req, res, next) {
	if (req.cookies.email !== req.params.email) {
		res.clearCookie('token');
		res.status(403);
		res.json({success: false, error: 'Authentication error!'});
	} else {
		next();
	}
}

function checkExists (req, res, next) {
	UserInfo.find({where: {email: req.params.email}}).then(userInfo => {
		if (userInfo === null) {
			errorMsg = 'No user info found for email: ' + req.params.email
			console.log(errorMsg);
			res.status(404);
			res.json({success: false, error: errorMsg});
		} else {
			req.userInfo = userInfo;
			next();
		}
	}).catch(err => {
		console.log(err);
		res.send(err);
	})
}

router.get('/user_info', authenticate, (req, res) => {
	UserInfo.findAll().then(results => {
		res.json(results);
	})
	.catch(err => {
		console.log(err);
		res.end(err);
	})
})

router.post('/user_info', authenticate, (req, res) => {
	UserInfo.create(req.body).then(() => {
		res.json({success: true})
	}).catch(err => {
		console.log(err);
		res.end(err);
	})
})

router.get('/user_info/:email', authenticate, checkExists, (req, res) => {
	res.json(req.userInfo);
})

router.put('/user_info/:email', authenticate, checkOwnership, checkExists, (req, res) => {
	req.userInfo.update(req.body).then(() => {
		res.json({success: true});
	}).catch(err => {
		res.send(err);
	})
})

router.delete('/user_info/:email', authenticate, checkOwnership, checkExists, (req, res) => {
	req.userInfo.destroy().then(() => {
		res.json({success: true})
	}).catch(err => {
		res.end(err);
	})
})

module.exports = router;