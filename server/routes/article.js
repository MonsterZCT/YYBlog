var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var util = require('util');
var fs = require('fs'); // 引入fs模块
var config = require('../tool/config')
let Token = require('../tool/Token')

var articleOperate = require('../operate/articleOperate');

//cnpm install formidable
/* GET home page. */
router.get('/', async function (req, res, next) { //getallarticle
    let returnData = {
        code: 400,
        result: {
            articles: []
        }
    }
    returnData.data = await articleOperate.selectAllArticle()
        .then((data) => {
            returnData.code = 200;
            return data
        })
        .catch((err) => {
            returnData.code = 500;
            console.log(err);
        });
    res.send(returnData);

});

router.post('/getarticle', async function (req, res, next) { //根据文章ID查找对应文章
    let returnData = {
        code: 401,
        result: {
            articles: []
        }
    }
    let mes = Token.check(req.headers.token);
    if (!mes.tokenValid) {
        return returnData;
    }
    returnData.tokenValid = true;
    await articleOperate.selectArticle(req.body.articleID)
        .then((data) => {
            returnData.code = 200;
            returnData.result.articles = data;
        })
        .catch((err) => {
            returnData.code = 500;
            console.log(err);
        });

    res.send(returnData);

});

router.post('/saveimg', (req, res, next) => {
    let returnData = {
        code: 401,
        result: {
            path: ''
        }
    }
    //创建表单上传
    var form = new formidable.IncomingForm();
    //设置编辑
    form.encoding = 'utf-8';
    //设置文件存储路径
    form.uploadDir = "./public/images/article";
    //保留后缀
    form.keepExtensions = true;
    //设置单文件大小限制    
    form.maxFieldsSize = 2 * 1024 * 1024;
    //form.maxFields = 1000;  设置所以文件的大小总和

    form.parse(req, function (err, fields, files) {
        util.inspect({
            fields: fields,
            files: files
        });
        returnData.result.path = config.path + files.image.path.replace(/public\\images\\/g, "/");
        returnData.code = 200;
    });
    res.send(returnData);
});

router.post('/savearticle', async (req, res, next) => {
    let returnData = {
        code: 401,
        result: {
            article: {}
        }
    }
    let mes = check(req.headers.token);

    let article = req.body.article;

    if (!mes.tokenValid) {
        res.send(returnData);
        return
    }

    article.userID = mes.decode.userID;

    if (!article.articleID) {
        await articleOperate.selectMaxArticleID()
            .then((data) => {
                article.articleID = data[0].articleID + 1;
            })
            .catch((err) => {
                returnData.code = 500;
                res.send(returnData);
                console.log(err);
                return
            })
        await articleOperate.insertArticle(article)
            .then((data) => {
                returnData.code = 200;
            })
            .catch((err) => {
                returnData.code = 500;
                console.log(err);
            })
        returnData.result.article = article;
        res.send(returnData);
        return
    }

    await articleOperate.updataArticle(article)
        .then((data) => {
            returnData.code = 200;
        })
        .catch((err) => {
            returnData.code = 500;
            console.log(err);
        })

    returnData.result.article = article;
    res.send(returnData);
});

router.get('/getuserarticle', async function (req, res, next) {
    let returnData = {
        code: 401,
        result: {
            articles: []
        }
    }
    let mes = check(req.headers.token);
    if (!mes.tokenValid) {
        returnData.code = 401;
        res.send(returnData);
        return
    }

    await articleOperate.selectPersonArticle(mes.decode.userID)
        .then((data) => {
            returnData.result.articles = data;
        })
        .catch((err) => {
            returnData.code = 500;
            console.log(err);
        });
    res.send(returnData);
});

router.post('/deletearticle', async function (req, res, next) {
    let returnData = {
        code: 401
    }
    let mes = check(req.headers.token);
    if (!mes.tokenValid) {
        res.send(returnData);
        return
    }
    await articleOperate.deleteArticle(req.body.articleID)
        .then((data) => {
            returnData.code = 200;
        })
        .catch((err) => {
            console.log(err);
        });
    res.send(returnData);

});




module.exports = router;