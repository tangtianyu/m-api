const Sequelize = require('sequelize');
const Database = require('./database');
const Album =require('./Album')
const Singer =require('./Singer')

const Song = Database.define('song', {
    songName: {
        type: Sequelize.STRING
    },
    songUrl: {
        type: Sequelize.STRING
    },
    m_Type:{
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
    lyric:{
        type: Sequelize.TEXT
    }
});

Album.hasMany(Song, {as: 'songs'})
Singer.hasMany(Song, {as: 'songs'})

Song.belongsTo(Singer)
Song.belongsTo(Album)


Song.sync();

module.exports=Song;