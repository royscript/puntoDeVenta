const mysql = require('../conexiones/conexionMysql');
class Estado extends mysql{
    constructor(){
        super();
        this.usuariosOnline = [];
    }

    listar(){
        return this.consulta("SELECT * FROM estado");
    }
    insertar(nombreEstado){
        const sql = "INSERT INTO estado (nombreEstado) VALUES (?)";
        return this.consulta(sql,[nombreEstado]);
    }
}
module.exports =  Estado;