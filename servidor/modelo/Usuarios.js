const mysql = require('../conexiones/conexionMysql');
class Usuarios extends mysql{
    constructor(){
        super();
        this.usuariosOnline = [];
    }

    listar(){
        return this.consulta("SELECT * FROM usuario");
    }

    login(rutUsuario,contrasena){
        const sql = "SELECT * FROM usuario where rutUsuario like (?) and contrasenaUsuario like (?) ";
        return this.consulta(sql,[rutUsuario,contrasena]);
    }
}
module.exports =  Usuarios;