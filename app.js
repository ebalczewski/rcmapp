require('dotenv').config()

const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_DEV !== 'production' //true false
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

const apiRoutes = require('./routes')

nextApp.prepare().then(() => {
  const app = express()
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use('/api', apiRoutes);

  app.get('*', (req, res) => {
    return handle(req, res);
  })

  app.listen(PORT, err => {
    if (err) throw err;
  })
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

app.get('/addresses/users', function(req, res){
	Address.findAll({
		include: [
			{
				model: User
			}
		]
	}).then(address => res.json(address))
}) 

	// Address.findAll({
	// 	include: [{
	// 		model: [user]
	// 	}]
	// }).then(function(addresses) {
	// 	res.json(addresses);
	// });

// function getById(model, id) {
// 	return model.findOne({
// 		where: {
// 			id: id
// 		}
// 	})
// };



// app.get('/users', function (req, res) {
// 	User.findAll().then(function(users) {
// 		res.json(users);
// 	});
// });

app.listen(port, () => console.log(`Serving on port ${port}.`))

