let express = require('express');
let router = express.Router();
const fs = require('fs');

router.get('/', function (req, res, next) {

    fs.readFile('./img/data.txt', 'utf-8', function (err, data) {
        if (err) {
            throw err;
        }
       //  let imgs = data.split('/n');
       // // console.log(imgs.length)
       // // imgs.toString()
        res.json(data);
    });
});

module.exports = router;
