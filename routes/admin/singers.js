let express = require('express');
let router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op

const fs = require('fs');
const async = require('async');
const foorb = require('../../config/findObjOfReqBody').foorb;
const Singer = require('../../models/Singer');
const Album = require('../../models/Album');
const Song = require('../../models/Song');

router.get('/', function (req, res, next) {
    Singer.all({
        where:{
            id:{
                [Op.gt]:-1
            }
        }
    }).then((singers) => {
        res.json({singers:singers})
    });
});



router.get('/real', function (req, res, next) {
    Singer.all(
        {
            include: [{
                model: Album,
                as: 'albums',
            }],
        }
    ).then((singers) => {
        res.json({singers:singers})
    });
});

router.get('/all', function (req, res, next) {
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


router.post('/new', function (req, res, next) {
    Singer.bulkCreate(req.body).then((singers) => {
        res.json('ok')
    })
});


router.post('/edit', function (req, res, next) {
    fs.readFile('./edit_Id/singersId.js', 'utf-8', function (err, data) {
        if (err) {
            throw err;
        }
        let editsingersid = data.split(',');
        Singer.findAll({
            where: {
                id: editsingersid
            }
        }).then(singers => {
            async.map(singers, (singer, callback) => {
                let updateData = req.body[foorb(singer.id, req.body)]
                singer.update(updateData).then(() => {
                    callback(null, singer);
                })
            }, (err, result) => {
                //当err存在，则执行foo(err)错误处理函数，否则不执行
                err && foo(err);
                fs.writeFile('edit_Id/singersId.js', '', {flag: 'w'}, function (err) {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log('写入成功');
                        res.json('ok')
                    }
                });
            });
        });
    });
});


router.post('/multipledel', function (req, res, next) {
    Singer.destroy({
        where: {
            id: req.body.ids
        }
    }).then(() => {
        res.json('ok')
    })
});

router.delete('/:id', function (req, res, next) {
    Singer.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.json('ok')
    });
});


router.post('/postsingersid', function (req, res, next) {

    fs.writeFile('./edit_Id/singersId.js', req.body.ids, {flag: 'w'}, function (err) {
        if (err) {
            console.error(err);
        } else {
            console.log('写入成功');
            res.json('ok')
        }
    });
});

router.get('/editsingersid', function (req, res, next) {

    fs.readFile('./edit_Id/singersId.js', 'utf-8', function (err, data) {
        if (err) {
            throw err;
        }
        let editsingersid = data.split(',');
        Singer.findAll({
            where: {
                id: editsingersid
            }
        }).then(singers => {
            res.json({singers:singers})
        })
    });
});

module.exports = router;
