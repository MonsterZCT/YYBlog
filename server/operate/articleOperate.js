var dbConfig = require('./dbConfig');

let selectMaxArticleID = async function () {
    let sql = "SELECT article.articleID FROM article ORDER BY article.articleID DESC LIMIT 1 ";
    let sqlArr = [];

    return await new Promise(
        (resolve, reject) => {
            dbConfig.sqlConnect(sql, sqlArr, (err, data) => {
                resolve(data);
                reject(err);
            });
        })
}

let selectArticle = async function (articleID) {
    let sql = `SELECT * FROM article WHERE articleID = ?`
    sqlArr = [articleID];

    return await new Promise(
        (resolve, reject) => {
            dbConfig.sqlConnect(sql, sqlArr, (err, data) => {
                resolve(data);
                reject(err);
            });
        }
    )
}

let selectAllArticle = async function () {
    let sql = `SELECT * FROM article`
    sqlArr = [];

    return await new Promise(
        (resolve, reject) => {
            dbConfig.sqlConnect(sql, sqlArr, (err, data) => {
                resolve(data);
                reject(err);
            });
        }
    )
}

let selectPersonArticle = async function (userID) {
    let sql = `SELECT * FROM article WHERE userID = ?`
    sqlArr = [userID];

    return await new Promise(
        (resolve, reject) => {
            dbConfig.sqlConnect(sql, sqlArr, (err, data) => {
                resolve(data);
                reject(err);
            });
        }
    )
}

let selectArticleByType = async function (articleType) {
    let sql = `SELECT * FROM article WHERE articleType = ?`
    sqlArr = [articleType];

    return await new Promise(
        (resolve, reject) => {
            dbConfig.sqlConnect(sql, sqlArr, (err, data) => {
                resolve(data);
                reject(err);
            });
        }
    )
}

let insertArticle = async function (article) {
    let sql = "INSERT INTO `blog`.`article`(`articleID`, `userID`, `articleTitle`, `articleType`, `articleContent`) " +
        "VALUES(?, ?, ?, ?, ?); ";
    let sqlArr = [article.articleID, article.userID, article.articleTitle, article.articleType, article.articleContent];

    return await new Promise(
        (resolve, reject) => {
            dbConfig.sqlConnect(sql, sqlArr, (err, data) => {
                resolve(data);
                reject(err);
            });
        })
}

let updataArticle = async function (article) { //修改文章并保存
    let sql = "UPDATA INTO `blog`.`article`(`articleTitle`, `articleType`, `articleContent`) " +
        "VALUES(?, ?, ?); " +
        "WHERE articleID=?";
    let sqlArr = [article.articleTitle, article.articleType, article.articleContent, article.articleID];

    return await new Promise(
        (resolve, reject) => {
            dbConfig.sqlConnect(sql, sqlArr, (err, data) => {
                resolve(data);
                reject(err);
            });
        })
}

let publishArticle = async function (article) { //修改文章并保存
    let sql = "UPDATA INTO `blog`.`article`(`articleTitle`, `articleType`, `articleContent`,`articleContainer`) " +
        "VALUES(?, ?, ?, ?); " +
        "WHERE articleID=?";
    let sqlArr = [article.articleTitle, article.articleType, article.articleContent, article.articleContainer, article.articleID];

    return await new Promise(
        (resolve, reject) => {
            dbConfig.sqlConnect(sql, sqlArr, (err, data) => {
                resolve(data);
                reject(err);
            });
        })
}

let deleteArticle = async function (articleID) {
    let sql = `DELETE FROM article WHERE articleID=?;`
    sqlArr = [articleID];

    return await new Promise(
        (resolve, reject) => {
            dbConfig.sqlConnect(sql, sqlArr, (err, data) => {
                resolve(data);
                reject(err);
            });
        }
    )
}

module.exports = {
    selectMaxArticleID, //查询文章最大ID
    insertArticle, //插入文章
    selectArticle, //根据文章ID，查找对应文章
    selectPersonArticle, //根据用户ID，查找所有文章
    selectAllArticle, //查找所有文章
    selectArticleByType, //根据类型，查找所有文章
    deleteArticle, //根据文章ID，删除对应文章
    updataArticle, //更新文章,
    publishArticle,//发布并保存文章
    
}