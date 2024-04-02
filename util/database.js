const mysql = require('mysql2');

const pool = mysql.createPool({
    host : 'localhost',
    database : 'mayank-nodejs',
    user : 'root',
    password : 'Mayank@123'
})

module.exports = pool.promise();