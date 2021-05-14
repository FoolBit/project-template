config = {
    database: {
        host: 'localhost',
        port: 3306,
        database: '',
        user: '',
        password: ''
    },
    https: {
        key: "./cert/",
        cert: "./cert/"
    },
    wechat: {
        appid:'',
        secret: ''
    },
    jwt:{
        public_key: '../pem/',
        private_key: '../pem/',
    },
    salt: ''
}
module.exports = config;