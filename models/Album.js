const Sequelize = require('sequelize');
const Database = require('./database');
const Singer =require('./Singer')

const Album = Database.define('album', {

    albumName: {
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
    sellDay: {
        type: Sequelize.DATE
    }
});

Singer.hasMany(Album, {as: 'albums'})
Album.belongsTo(Singer)

Album.sync();

module.exports = Album;