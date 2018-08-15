const Sequelize = require('sequelize');
const database = new Sequelize('m-api', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
});
module.exports=database;