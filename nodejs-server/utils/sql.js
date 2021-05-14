const mysql = require('mysql');
const config = require('../config/config')


const pool = mysql.createPool({
    host: config.database.host,
    port: config.database.port,
    database: config.database.database,
    user: config.database.user,
    password: config.database.password,
    multipleStatements: true
});

function executeSql(connection, sql, sql_params) {
    return new Promise((resolve, reject) => {
        connection.query(sql, sql_params, function (err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            };
        })
    })
};


function rowsCount(connection) {
    let sql = 'SELECT FOUND_ROWS() total;'
    return executeSql(connection, sql, [])
}

module.exports = {
    pool,
    executeSql,
    rowsCount
}