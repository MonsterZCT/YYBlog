var express = require('express');
var router = express.Router();

var userOperate = require('../operate/userOperate');
var default_head_portrait = 'default_head_portrait.svg'

let AES = require('../tool/AES');
let Token = require('../tool/Token')

/* GET home page. */
router.get('/', function (req, res, next) {
    res.end();
});

router.post('/', async function (req, res, next) {
    let returnData = {
        code: 400,
        result: {
            blogToken:''
        },
    };
    let keepLogin=false,
        user= {
            userID: 0,
            userPassword: ""
        };
    
    try {
        keepLogin = req.body.keepLogin;
        user.userID = req.body.user.userID;
        user.userPassword = req.body.user.userPassword;
    } catch (error) {

    }

    if (typeof keepLogin !== "boolean" || user.userID === 0 || user.userPassword === "") {
        console.log("======");
        res.send(returnData);
        return;
    }

    let realPassword = await userOperate.selectUserID(user.userID)
        .then((data) => {
            return AES.decryption(data[0].userPassword);
        })
        .catch((err) => {
            return null;
        })


    //解析出来的密码是字符串
    if (realPassword === user.userPassword) {
        returnData.code = 200;
        let time = 60 * 60 * 1;
        if (keepLogin) {
            time = 60 * 60 * 24;
        }
        returnData.result.blogToken = Token.sign({
            userID: user.userID,
        }, time);
    }

    res.send(returnData);
});

router.post('/register', async function (req, res, next) {
    let returnData = {
        code: 400,
        result: {},
    };
    let user = {
        userID: 10000,
        userNickname: "",
        userPassword: "",
        userPhoto: default_head_portrait
    }

    try {
        user.userNickname = req.body.user.userNickname;
        user.userPassword = req.body.user.userPassword;
    } catch (error) {
        // console.log(error);
    }

    if (user.userNickname === "" || !user.userPassword === "") {
        res.send(returnData);
        return;
    }

    await userOperate.selectMaxUserID()
        .then((data) => {
            if (data[0]) {
                user.userID = data[0].userID + 1;
            } else {
                user.userID = 10000;
            }
        })
        .catch((err) => {
            console.log("err");
        });

    user.userPassword = AES.encryption(user.userPassword);

    await userOperate.insertNewUser(user)
        .then((data) => {
            console.log(data);
            if (data) {
                returnData.result["user"] = {
                    userID: user.userID
                };

            } else {
                //服务器端无法理解客户端发送的请求，请求报文可能存在错误
            }
        })
        .catch((err) => {
            console.log(err);
        });
    returnData.code = 200;
    res.send(returnData);
    return;
});
module.exports = router;