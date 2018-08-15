const Sequelize = require('sequelize');
const Database = require('./database');


const User = Database.define('user', {
    userName: {
        type: Sequelize.STRING
    },
    email:{
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    image: {
        type: Sequelize.STRING
    },
    Jurisdiction:{
        type: Sequelize.INTEGER
    },
    openId: {
        type: Sequelize.STRING
    },
    favourSongs: {
        type: Sequelize.TEXT
    },
    favourAlbums: {
        type: Sequelize.TEXT
    },
    favourSingers: {
        type: Sequelize.TEXT
    },
    friends:{
        type: Sequelize.TEXT
    },
    token:{
        type: Sequelize.TEXT
    },
    V_CODE:{
        type: Sequelize.STRING
    },

});

User.sync();

module.exports=User;