var express = require('express');
var router = express.Router();

const Singer = require('../../models/Singer');
const Album = require('../../models/Album');
const Song = require('../../models/Song');
/* GET users listing. */


router.get('/', function (req, res, next) {
    Song.findAll({
        include: [{model: Singer}, {model: Album}],
    }).then((songs) => {
        res.json({songs:songs})
    });
});


router.post('/new', function (req, res, next) {
    Song.bulkCreate(req.body).then((songs) => {
        res.json('ok')
    })
});

module.exports = router;