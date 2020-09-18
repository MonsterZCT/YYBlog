var dbConfig = require('./dbConfig')

let selectMaxUserID = async function () {
    let sql = "SELECT user.userID FROM user ORDER BY user.userID DESC LIMIT 1 ";
    let sqlArr = [];

    return await new Promise(
            (resolve,reject) => {
                dbConfig.sqlConnect(sql, sqlArr, (err, data) => {
                    resolve(data);
                    reject(err);
                });
            })
}

let selectUserID = async function (userID) {
    let sql = "SELECT user.userPassword FROM user WHERE userID=?";
    let sqlArr = [userID];

    return await new Promise(
            (resolve,reject) => {
                dbConfig.sqlConnect(sql, sqlArr, (err, data) => {
                    resolve(data);
                    reject(err);
                });
            })
}

let insertNewUser = function (user) {
    let sql = "INSERT INTO `blog`.`user`(`userID`, `userNickname`, `userPassword`, `userPhoto`) VALUES (?, ?, ?, ?); ";
    let sqlArr = [user.userID,user.userNickname,user.userPassword,user.userPhoto];

    return  new Promise(
            (resolve,reject) => {
            dbConfig.sqlConnect(sql, sqlArr, (err, data) => {
                    console.log(data);
                    resolve(data);
                    reject(err);
                });
            })
        // .then((data) => {
        //     return data
        // }).catch((err) => {
            
        // })
}



module.exports = {
    selectMaxUserID,
    selectUserID,
    insertNewUser
}