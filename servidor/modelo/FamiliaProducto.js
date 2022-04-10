const mysql = require('../conexiones/conexionMysql');
class Familia extends mysql{
    constructor(){
        super();
        this.usuariosOnline = [];
    }

    listar(){
        return this.consulta("SELECT * FROM familia");
    }
    insertar(nombreFamilia){
        const sql = "INSERT INTO familia (nombreFamilia) VALUES (?)";
        return this.consulta(sql,[nombreFamilia]);
    }
}
module.exports =  Familia;