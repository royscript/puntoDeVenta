require('dotenv').config();
const mysql = require('mysql');

class conexionMysql {
    constructor(){
        this.conexion = mysql.createPool({
            host : process.env.HOST_MYSQL,
            user : process.env.USER_MYSQL,
            password : process.env.PASSWORD_MYSQL,
            database : process.env.DATABASE_MYSQL
        });
    }
    consulta(sql, parametros){
        return new Promise((resolve, reject)=>{
            this.conexion.query(sql,parametros,  (error, elements)=>{
                if(error){
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    }
}
module.exports = conexionMysql;