const Sequelize = require('sequelize');

const sequelize = new Sequelize('expresspractise','root','manager',
{ dialect : 'mysql',host : 'localhost'});

module.exports = sequelize;