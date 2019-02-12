const Sequelize = require('sequelize');

// Or you can simply use a connection uri
const sequelize = new Sequelize('sqlite:rcmapp.db');

const User = sequelize.define('user', {
  token: {
    primaryKey: true,
    type: Sequelize.STRING
  },
  expiration: {
    type: Sequelize.DATE
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false, // maybe make true later if we are handling token cleanup
  },
})

const UserInfo = sequelize.define('user_info', {
  email: {
     type: Sequelize.STRING,
     allowNull: false,
     unique: true
  },
  first_name: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null,
  },
  last_name: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null,
  },
  batches: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null
  },
  social: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
    defaultValue: false
  },
  tech: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
    defaultValue: false
  },
  stay: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
    defaultValue: false
  },
  latitude: {
    type: Sequelize.DECIMAL(16)
  },
  longitude: {
    type: Sequelize.DECIMAL(16)
  }},
  {tableName: 'user_info'}
);

UserInfo.hasMany(User);

sequelize.sync()

module.exports = {
  User,
  UserInfo,
}