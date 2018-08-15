const express = require('express');
const multer = require('multer');
const router = express.Router();
const upload = multer({dest: 'uploads/'});
const fs = require('fs');

const qn = require('qn');
const img_config = require('../config/qiniuConfig').qiniu_img_config;
const song_config = require('../config/qiniuConfig').qiniu_song_config;
const img_serverURL = require('../config/qiniuConfig').img_serverUrl;
const song_serverURL = require('../config/qiniuConfig').song_serverUrl;


router.post('/img', upload.any(), function (req, res, next) {
    let client = qn.create(img_config);
      client.upload(fs.createReadStream(req.files[0].path), function (err, result) {
       res.json({url: img_serverURL + result.key})
        fs.unlink(req.files[0].path,function (err) {
            if(err) throw err;
            console.log('删除成功')
        })
     })

});


router.post('/song', upload.any(), function (req, res, next) {
    let client = qn.create(song_config);
    client.upload(fs.createReadStream(req.files[0].path), function (err, result) {
        res.json({url: song_serverURL + result.key,mimetype:req.files[0].mimetype})
        fs.unlink(req.files[0].path,function (err) {
            if(err) throw err;
            console.log('删除成功')
        })
    })

});

module.exports = router;