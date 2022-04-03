const mysql = require('../conexiones/conexionMysql');
class UsuariosOnline extends mysql{
    constructor(){
        super();
        this.usuariosOnline = [];
    }

    listar(){
        return this.consulta("SELECT * FROM `usuariosonline`");
    }

    setUsuariosOnline(usuario,refreshToken){
        const sql = "INSERT INTO `usuariosonline`" 
                        +"(`fechausuariosOnline`,`tokenusuariosOnline`,`usuario_idUsuario`,`usuario_Permiso_idPermiso`) "
                        +" VALUES "
                        +"(NOW(),?,?,?)";
        return this.consulta(sql,[refreshToken,usuario.idUsuario,usuario.Permiso_idPermiso]);
    }
    verificarUsuarioOnline(refreshToken){
        const sql = "SELECT * FROM `usuariosonline` WHERE `tokenusuariosOnline` LIKE ? ";
        return this.consulta(sql,[refreshToken]);
    }
    eliminarToken(token){
        const sql = "DELETE FROM `usuariosonline` WHERE `tokenusuariosOnline` LIKE ?";
        return this.consulta(sql,[token]);
    }
}
module.exports =  UsuariosOnline;