const https = require("https");
const fs = require("fs");
let express = require('express');
let multer = require('multer')

// my utils
const logger = require('./utils/logger')

// router
const user = require('./route/user')

// config
const config = require('./config/config')

// init
let app = express();

// parse params
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// parse mylter
let objMulter=multer({dest: '/var/www/html/img/'}); //设置上传的的图片保存目录
app.use(objMulter.any());

// add logger
logger.use(app)

// Configuare https
const httpsOption = {
    key: fs.readFileSync(config.https.key),
    cert: fs.readFileSync(config.https.cert)
}


app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


app.all('/', function (req, res) {
    res.send('Hello,myServer');
});

app.post('/submitUserInfo', user.submitUserInfo)


https.createServer(httpsOption, app).listen(8000);
// app.listen(8000)