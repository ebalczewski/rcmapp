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

const Address = sequelize.define('address', {
  streetAddress1: {
    type: Sequelize.STRING
  },
  streetAddress2: {
    type: Sequelize.STRING,
    allowsNull: true,
    defaultValue: null
  },
  city: {
    type: Sequelize.STRING,
  },
  state: {
    type: Sequelize.STRING,
  },
  zip: {
    type: Sequelize.STRING,
  },
  country: {
    type: Sequelize.STRING,
  }
});

User.belongsToMany(Address, {through: 'UserAddress'});
Address.belongsToMany(User, {through: 'UserAddress'});

sequelize.sync()

module.exports = {
  User,
  Address
}
// module.exports = {
//   User,
//   Address
// }
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
