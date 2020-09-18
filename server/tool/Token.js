var JWT = require("jsonwebtoken");

var secretOrPrivateKey = "this is the secretOrPrivateKey!"; // 这是加密的key（密钥） 

let sign = function (param,time) {
    return JWT.sign(param, secretOrPrivateKey, {
        expiresIn: time // 过期
    });
}



// var token = rq.body.token || rq.query.token || rq.headers["x-access-token"]; // 从body或query或者header中获取token

let verify = function (token) {
    let mes = {
        tokenValid: false,
        decode:""
    };
  return  JWT.verify(token, secretOrPrivateKey, function (err, decode) {
        if (err) { //  时间失效的时候/ 伪造的token          
            return mes;
        } else {
            mes.tokenValid = true;
            mes.decode = decode;
            return mes;
        }
    })
}

let check =function (blogToken) {
    let tokenValid = false,
        decode = '';
    if (blogToken) { //是否存在
        let mes = verify(blogToken);
        tokenValid = mes.tokenValid;
        decode = mes.decode;
    }
    return {
        tokenValid,
        decode
    }
}

module.exports = {
    sign,
    verify,
    check
}