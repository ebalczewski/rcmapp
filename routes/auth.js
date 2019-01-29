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

router.get('/logout', (req, res) => {
  res.clearCookie('userEmail');
  res.redirect('/');
})

// Expects redirect URL of /api/authorize
router.get('/authorize', (req, res) => {
  const code = req.query.code;

  authenticator.getToken(code)
  .then((token) => {
    let client = hackerschool.client();
    client.setToken(token);
    client.people.me()
    .then(function(user) {
      res.cookie('firstName', user.first_name);
      res.cookie('lastName', user.last_name);
      res.cookie('userEmail', user.email);
      res.cookie('batches', JSON.stringify(user.batches));
      res.redirect('/');
    })
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
