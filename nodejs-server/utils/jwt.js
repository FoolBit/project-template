// 引入模块依赖
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const config = require('../config/config')

//生成token
function generateToken(data) {
        let created = Math.floor(Date.now() / 1000);
        let cert = fs.readFileSync(path.join(__dirname, config.jwt.private_key));//私钥
        let token = jwt.sign({
            data,
            exp: created + 60 * 30,
        }, cert, {algorithm: 'RS256'});
        return token;
}

// 校验token
function verifyToken(token) {
        let cert = fs.readFileSync(path.join(__dirname, config.jwt.public_key));//公钥
        let res;
        try {
            let result = jwt.verify(token, cert, {algorithms: ['RS256']}) || {};
            let {exp = 0} = result, current = Math.floor(Date.now() / 1000);
            if (current <= exp) {
                res = result.data || {};
            }
        } catch (e) {
            res = 'err';
        }
        return res;
}


module.exports = {
    generateToken,
    verifyToken
};