const Sequelize = require('sequelize');

// Or you can simply use a connection uri
const sequelize = new Sequelize('sqlite:rcmapp.db');

const User = sequelize.define('user', {
  email: {
     type: Sequelize.STRING,
     allowNull: false,
     unique: true
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null,
  },
  batch: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null
  }
});

const Address = sequelize.define('address', {
  current: {
    type: Sequelize.BOOLEAN
  },
  latitude: {
    type: Sequelize.DECIMAL(16)
  },
  longitude: {
    type: Sequelize.DECIMAL(16)
  }
});

User_Address = User.belongsToMany(Address, {through: 'UserAddress'});
Address_User = Address.belongsTo(User);

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
