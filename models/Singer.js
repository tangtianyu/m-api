const Sequelize = require('sequelize');
const Database = require('./database');


const Singer = Database.define('singer', {
    singerName: {
        type: Sequelize.STRING
    },
    introduction: {
        type: Sequelize.TEXT
    },
    popularity: {
    type: Sequelize.INTEGER
    },
    image: {
        type: Sequelize.STRING
    },
    photos: {
        type: Sequelize.TEXT
    },
    birthday:{
        type: Sequelize.DATE
    }
});


Singer.sync();

module.exports=Singer;