let express = require('express');
let router = express.Router();
const fs = require('fs');


const Singer = require('../models/Singer');
const Album = require('../models/Album');
const Song = require('../models/Song');



router.get('/imgs', function (req, res, next) {

    fs.readFile('./img/data.txt', 'utf-8', function (err, data) {
        if (err) {
            throw err;
        }
        res.json(data);
    });
});


router.get('/singers', function (req, res, next) {
    Singer.all().then((singers) => {
        res.json({singers:singers})
    });
});

router.get('/singers/all', function (req, res, next) {
    Singer.all({
        include: [{
            model: Album,
            as: 'albums',
            include: [{
                model: Song,
                as: 'songs',
            }],
        }],
    }).then((singers) => {
        res.json({singers:singers})
    });
});

router.get('/songs', function (req, res, next) {
    Song.findAll({
        include: [{model: Singer}, {model: Album}],
    }).then((song) => {
        res.json(song)
    });
});


router.get('/:id', function (req, res, next) {
    Singer.findById(req.params.id, {
        include: [{
            model: Album,
            as: 'albums',
            include: [{
                model: Song,
                as: 'songs',
            }],
        }],
    }).then((singer) => {
        res.json(singer)
    });
});


module.exports = router;
