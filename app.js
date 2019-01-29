require('dotenv').config()

var { User, Address } = require("./models.js");

const cors = require('cors')

const express = require('express')
const app = express();
const port = 4000;

app.use(cors())
app.use(express.json());

require('dotenv').config();

app.post('/oauthCallback', function(req, res) {
	var hackerschool = require('hackerschool-api');
	var client = hackerschool.client();

	var auth = hackerschool.auth({
		client_id: process.env.CLIENT_ID,
		client_secret: process.env.CLIENT_SECRET,
		redirect_uri: process.env.REDIRECT_URI
	});
	var code = req.query.code;
  
	auth.getToken(code)
	.then(function(token) {
	  client.setToken(token);
	  client.people.me()
	  .then(function(me) {
		  res.json({email: me.email});
	  })
	  .catch((err) => {
		res.send('Unable to get user email');
	  })
	}).catch((err) => {
	  res.send('There was an error getting the token');
	});
});

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
	return model.findOne({
		where: {
			id: id
		}
	})
};

//can I recycle getById???
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

const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_DEV !== 'production' //true false
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

const authRoutes = require('./routes/auth')
const apiRoutes = require('./routes/api')

nextApp.prepare().then(() => {
  const app = express()
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use('/auth', authRoutes);
  app.use('/api', apiRoutes);

  app.get('*', (req, res) => {
    return handle(req, res);
  })

  app.listen(PORT, err => {
    if (err) throw err;
  })
})
