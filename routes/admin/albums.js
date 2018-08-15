let express = require('express');
let router = express.Router();
const fs = require('fs');
const async = require('async');
const foorb = require('../../config/findObjOfReqBody').foorb;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Singer = require('../../models/Singer');
const Album = require('../../models/Album');
const Song = require('../../models/Song');

router.get('/', function (req, res, next) {
    Album.all({
        where:{
            id:{
                [Op.gt]:-1
            }
        }
    }).then((albums) => {
        res.json({albums:albums})
    });
});

router.get('/real', function (req, res, next) {
    Album.all().then((albums) => {
        res.json({albums:albums})
    });
});

router.post('/new', function (req, res, next) {
    Album.bulkCreate(req.body).then((albums) => {
        res.json('ok')
    })
});

router.delete('/:id', function (req, res, next) {
    Album.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.json('ok')
    });
});

router.post('/multipledel', function (req, res, next) {
    Album.destroy({
        where: {
            id: req.body.ids
        }
    }).then(() => {
        res.json('ok')
    })
});

router.post('/postalbumsid', function (req, res, next) {

    fs.writeFile('./edit_Id/albumsId.js', req.body.ids, {flag: 'w'}, function (err) {
        if (err) {
            console.error(err);
        } else {
            console.log('写入成功');
            res.json('ok')
        }
    });
});

router.get('/editalbumsid', function (req, res, next) {

    fs.readFile('./edit_Id/albumsId.js', 'utf-8', function (err, data) {
        if (err) {
            throw err;
        }
        let editalbumsid = data.split(',');
        Album.findAll({
            where: {
                id: editalbumsid
            }
        }).then(albums => {
            res.json({albums:albums})
        })
    });
});



router.post('/edit', function (req, res, next) {
    fs.readFile('./edit_Id/albumsId.js', 'utf-8', function (err, data) {
        if (err) {
            throw err;
        }
        let editalbumsid = data.split(',');
        Album.findAll({
            where: {
                id: editalbumsid
            }
        }).then(albums => {
            async.map(albums, (album, callback) => {
                let updateData = req.body[foorb(album.id, req.body)]
                album.update(updateData).then(() => {
                    callback(null, albums);
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

module.exports = router;
