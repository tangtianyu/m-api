var express = require('express');
var router = express.Router();
const crypto = require("crypto");
const User = require('../../models/User');
const jwt = require('jsonwebtoken');

/* GET users listing. */

const sendEmail = require('../../config/mynodemailer').sendEmail;
const getRandomCode = require('../../config/randomCode').getRandomCode;

router.get('/', function (req, res, next) {

});

router.post('/register', function (req, res, next) {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then((user) => {
        if (user == null) {
            res.json({msg:'邮箱错误'})
        } else {
            if (user.V_CODE != req.body.V_CODE) {
                res.json({msg:'验证码错误'})
            } else {
                let md5 = crypto.createHash("md5");
                let newPas = md5.update(req.body.password).digest("hex");
                user.update({
                    userName: req.body.userName,
                    password: newPas
                }).then(() => {
                    res.json({msg:'注册成功'})
                })
            }
        }
    })
});

router.post('/register/sendv_code', function (req, res, next) {
    if(req.body.email=='787060545@qq.com') {
        res.json({msg: 'Are you fucking sure this is your god damn email?'})
        return false
    }
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then((user) => {
        if (user == null) {
            let V_CODE = getRandomCode();
            sendEmail(req.body.email, V_CODE);
            User.create({email: req.body.email, V_CODE: V_CODE}).then((user) => {
                res.json({code:200,msg:'验证码已发送'})
            })
        } else {
                if(user.password==null){
                   let timeout = new Date()-user.updatedAt
                    if(timeout>120000){
                        let V_CODE = getRandomCode();
                        sendEmail(req.body.email, V_CODE);
                        user.update({V_CODE: V_CODE}).then((user) => {
                            res.json({code:200,msg:'验证码已发送'})
                        })
                    }else{
                       res.json({code:200,msg:"操作过快，请隔"+parseInt((120000-timeout)/1000)+"秒后再试",restTime:parseInt((120000-timeout)/1000)+1})
                    }
                }
                else {
                    res.json({msg:'该邮箱已注册'})
                }
        }
    })
});


router.post('/login', function (req, res, next) {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then((user) => {
        if (user == null) {
            res.json({msg:'该邮箱不存在'})
        } else {
            let md5 = crypto.createHash("md5");
            let userPas = md5.update(req.body.password).digest("hex");
            if (userPas !== user.password) {
                res.json({msg:'密码错误'})
            } else {
                //生成token
                const token = jwt.sign({
                        password: user.password
                    },'user_pass_xxx' //随便一点内容，撒盐：加密的时候混淆
                    ,{
                        expiresIn: 1200 //60秒到期时间
                    });
                 res.json({msg:'登录成功',token:token,expiresIn: 1200})
            }
        }
    })
});

module.exports = router;