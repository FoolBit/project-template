const log4js = require('log4js');
const log_config = require('../config/log4js.json')
log4js.configure(log_config)
const _logger = log4js.getLogger()


function get(name){
    var logger = log4js.getLogger(name);
    return logger;
}

function use(app){
    app.use(log4js.connectLogger(_logger, { level: 'auto', format: '[:method :url] [:status :response-timems] [:remote-addr]'}));
}

module.exports={
    get,
    use,
}