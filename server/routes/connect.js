//连接数据库公共模块
// 引入mysql
const mysql = require('mysql');
//连接数据库
const connection =mysql.createConnection({
    host :'127.0.0.1',
    user :'root',
    password :'root',
    database :'smms'
})

//执行连接
connection.connect(()=>{
    console.log('数据库连接成功');
})
//暴露出去
module.exports = connection;
