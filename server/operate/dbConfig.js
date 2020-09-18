const mysql = require('mysql')
const config = {
    // 疑问：config必须放在exports外
    // connectionLimit: 10,
    host: 'localhost',
    // port: '3306',
    user: 'root',
    password: '123456',
    database: 'blog',
    acquireTimeout: 300,
}

// async
module.exports = {
    sqlConnect: function (sql, sqlArr,callback) {

        let pool = mysql.createPool(config);
        pool.getConnection((err, conn) => {
            if (err) {
                console.log('连接失败xxxx' + err);
                return
            }
            conn.query(sql, sqlArr, callback);
            conn.release();
        })
    }
}