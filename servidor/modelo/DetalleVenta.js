const mysql = require('../conexiones/conexionMysql');
class DetalleVenta extends mysql{
    constructor(){
        super();
        this.usuariosOnline = [];
    }

    listar(){
        return this.consulta("SELECT * FROM tipoventa");
    }
    async listarConParametros(pagSiguiente, cantPorPag, search){
        var where = ''; 
        var parametrosBuscar = [];
        if(search){
            parametrosBuscar = ['%'+search+'%'];
            where = ` WHERE idVenta LIKE ? `;
            pagSiguiente = 1;//Cuando se realiza una busqueda comienza con la pagina 1
        }
        let resp = {
            datos : await this.consulta("SELECT * FROM venta "+where+" "+this.paginador(pagSiguiente, cantPorPag),parametrosBuscar),
            cantidad : await this.consulta("SELECT count(idVenta) as cantidad FROM venta "+where+" ",parametrosBuscar)
        }
        return resp;
    }
    async buscarUnaVenta(idVenta){
        return await this.consulta("SELECT * FROM venta WHERE idVenta LIKE ? ",[idVenta]);
    }
    insertar(cantidadDetalleVenta, valorDetalleVenta, Venta_idVenta, Producto_idProducto, Producto_Estado_idEstado){
        const sql = `INSERT INTO detalleventa (cantidadDetalleVenta, 
                                        valorDetalleVenta, 
                                        Venta_idVenta, 
                                        Producto_idProducto, 
                                        Producto_Estado_idEstado)
                                        VALUES
                                        (?,?,?,?,?)`;
        return this.consulta(sql,[cantidadDetalleVenta, valorDetalleVenta, Venta_idVenta, Producto_idProducto, Producto_Estado_idEstado]);
    }
    editar(cantidadDetalleVenta, valorDetalleVenta, Venta_idVenta, Producto_idProducto, Producto_Estado_idEstado,idDetalleVenta){
        const sql = "UPDATE `detalleventa` "
                                +"SET "
                                +"cantidadDetalleVenta= ? "
                                +",valorDetalleVenta= ? "
                                +",Venta_idVenta= ? "
                                +",Producto_idProducto= ? "
                                +",Producto_Estado_idEstado= ? "
                    +" WHERE idDetalleVenta = ? ";
        return this.consulta(sql,[cantidadDetalleVenta, valorDetalleVenta, Venta_idVenta, Producto_idProducto, Producto_Estado_idEstado,idDetalleVenta]);
    }
    async eliminar(idDetalleVenta){
        const sql = "DELETE FROM `detalleventa` WHERE `idDetalleVenta` = ? ";
        var resp = await this.consulta(sql,[idDetalleVenta]);
        return resp;
    }
}
module.exports =  DetalleVenta;