const mysql = require('../conexiones/conexionMysql');
class Permisos extends mysql{
    constructor(){
        super();
        this.usuariosOnline = [];
    }

    listarPermisosDelUsuario(idPermiso){
        return this.consulta("SELECT * "
                                +"FROM `mantenedores` M "
                                +"INNER JOIN `permiso` P "
                                +"ON(M.`permiso_idPermiso`=P.idPermiso) "
                                +"WHERE P.idPermiso = ?",[idPermiso]);
    }
}
module.exports =  Permisos;