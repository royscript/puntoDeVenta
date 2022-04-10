const mysql = require('../conexiones/conexionMysql');
class Productos extends mysql{
    constructor(){
        super();
        this.usuariosOnline = [];
    }

    async listar(pagSiguiente, cantPorPag){
        let resp = {
            datos : await this.consulta("SELECT * FROM producto "+this.paginador(pagSiguiente, cantPorPag)),
            cantidad : await this.consulta("SELECT count(idProducto) as cantidad FROM producto ")
        }
        return resp;
    }
    insertar(nombreProducto,valorProducto,cantidadProducto,Estado_idEstado,Familia_idFamilia,precioVentaProducto,codigoBarraProducto){
        const sql = "INSERT INTO producto (nombreProducto,valorProducto,"
                                            +"cantidadProducto,Estado_idEstado,"
                                            +"Familia_idFamilia,precioVentaProducto,codigoBarraProducto) "
                                            +"VALUES (?,?,?,?,?,?,?)";
        return this.consulta(sql,[nombreProducto,valorProducto,cantidadProducto,Estado_idEstado,Familia_idFamilia,precioVentaProducto,codigoBarraProducto]);
    }
    editar(nombreProducto,valorProducto,cantidadProducto,Estado_idEstado,Familia_idFamilia,precioVentaProducto,idProducto,codigoBarraProducto){
        const sql = "UPDATE producto "
                                +"SET "
                                +"nombreProducto= ? "
                                +",valorProducto= ? "
                                +",cantidadProducto= ? "
                                +",Estado_idEstado= ? "
                                +",Familia_idFamilia= ? "
                                +",precioVentaProducto= ? "
                                +",codigoBarraProducto= ? "
                    +" WHERE idProducto = ? ";
        return this.consulta(sql,[nombreProducto,valorProducto,cantidadProducto,Estado_idEstado,Familia_idFamilia,precioVentaProducto,codigoBarraProducto,idProducto]);
    }
    async eliminar(idProducto){
        const sql = "DELETE FROM `producto` WHERE `producto`.`idProducto` = ? ";
        var resp = await this.consulta(sql,[idProducto]);
        return resp;
    }
}
module.exports =  Productos;