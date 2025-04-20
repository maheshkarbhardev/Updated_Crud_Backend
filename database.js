const mysql=require('mysql2');

const db=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'mahesh.27798',
    database:'practise'
})

module.exports=db;