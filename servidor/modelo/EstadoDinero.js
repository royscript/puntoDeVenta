const mysql = require('../conexiones/conexionMysql');
class EstadoDinero extends mysql{
    constructor(){
        super();
    }

    listar(){
        return this.consulta("SELECT * FROM estadodinero");
    }
}
module.exports =  EstadoDinero;