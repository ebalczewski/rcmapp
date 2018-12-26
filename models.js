const Sequelize = require('sequelize');

// Or you can simply use a connection uri
const sequelize = new Sequelize('sqlite:rcmapp.db');

const User = sequelize.define('user', {
  email: {
     type: Sequelize.STRING,
     unique: true,
  },
  firstName: {
    type: Sequelize.STRING,
    allowsNull: true,
    defaultValue: null,
  },
  lastName: {
    type: Sequelize.STRING,
    allowsNull: true,
    defaultValue: null,
  },
  batch: {
    type: Sequelize.STRING,
    allowsNull: true,
    defaultValue: null
  },
});

module.exports = User;

// force: true will drop the table if it already exists
/*User.sync().then(() => {
  // Table created
  return User.create({
		firstName: 'John',
  	lastName: 'Hancock',
  	email: 'john@hanckock.com',
  	batch: 'W1865',
	});
});*/
