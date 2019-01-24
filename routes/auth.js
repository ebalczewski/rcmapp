const express = require('express');
const router = express.Router();

const hackerschool = require('hackerschool-api');

var { User, Address } = require("../models.js");

const authenticator = hackerschool.auth({
    client_id: process.env.RECURSE_ID,
    client_secret: process.env.SECRET_KEY,
    site: process.env.TOKEN_HOST,
    redirect_uri: process.env.REDIRECT_URI
});

const authUrl = authenticator.createAuthUrl();

router.get('/login', (req, res) => {
  res.json({ authUrl : authUrl })
});

// Expects redirect URL of /api/authorize
router.get('/authorize', (req, res) => {
  const code = req.query.code;

  authenticator.getToken(code)
  .then((token) => { 
    res.cookie('access_token', token);
    res.redirect('/');
  })
  .catch((err)   => { 
    res.redirect('/')
  });
});

router.get('/users', function (req, res) {
	User.findAll().then(function(users) {
		res.json(users);
	});
});


module.exports = router;
