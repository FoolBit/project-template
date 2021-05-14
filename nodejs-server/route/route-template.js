const sqlutil = require('../utils/sql')
const pool = sqlutil.pool;
const utils = require('../utils/utils')
const logger = require('../utils/logger').get('app')

function func(req, response){
    pool.getConnection(function (err, connection) {
        let data = {}
        let sql = ""
        let params = []
        sqlutil.executeSql(connection, sql, params)
            .then((res)=>{
                response.json(utils.buildMsg(data))
            })
            .catch((err)=>{
                logger.error(err)
                response.json(utils.buildMsg(data, false, 'err'))
            })
    })

}

module.exports = {
    func
}