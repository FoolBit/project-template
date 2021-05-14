function buildMsg(data, flag=true, msg="Success"){
    return {
        "status": "200",
        "success": flag,
        "msg": msg,
        "data": data
    }
}

function buildSqlString(condition){
    let sql = ""
    let params = []
    for(let key in condition){
        sql += (sql?' AND ':'') + '??=?'
        params.push(key, condition[key])
    }

    _ = {
        sql: condition?' WHERE '+sql:'',
        params: params
    }
    return _
}

module.exports = {
    buildMsg,
    buildSqlString
}