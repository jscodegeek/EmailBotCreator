'use strict';
module.exports = (sequelize, DataTypes) => {
  var Registration = sequelize.define('Registration', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    provider: DataTypes.STRING,
    mode: DataTypes.STRING,
    bot_instance_id: DataTypes.STRING,
    status: DataTypes.STRING
  }, {});
  Registration.associate = function(models) {
    // associations can be defined here
  };
  return Registration;
};