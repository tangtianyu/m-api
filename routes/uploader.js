const express = require('express');
const router = express.Router();
const song_serverURL = require('../config/qiniuConfig').song_serverUrl;
const qiniu = require('qiniu');

const accessKey = 'PsM_NdKkSLts3i7tj4vpMmfXAhuF8aV2e_0XL1oJ';
const secretKey = '9jJW2nHQxyKbPSyoI3zevaFJ852lKJLVwSe3fpYg';
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
const options = {
    scope: 'mymusic',
};
let putPolicy = new qiniu.rs.PutPolicy(options);

router.get('/gettoken', function (req, res, next) {
    let uploadToken=putPolicy.uploadToken(mac);
    res.json({uploadToken:uploadToken,song_serverURL:song_serverURL})
});

module.exports = router;