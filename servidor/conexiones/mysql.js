require('dotenv').config();
const mysql = require('mysql');

module.exports = mysql.createPool({
    host : process.env.HOST_MYSQL,
    user : process.env.USER_MYSQL,
    password : process.env.PASSWORD_MYSQL,
    database : process.env.DATABASE_MYSQL
});