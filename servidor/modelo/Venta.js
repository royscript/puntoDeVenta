const mysql = require('../conexiones/conexionMysql');
const DetalleVenta = require('./DetalleVenta');
const Productos = require('./Productos');
const detalleVenta = new DetalleVenta();
const objetoProducto = new Productos();
class Venta extends mysql{
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
    async insertar(fechaVenta, totalVenta, Cliente_idUsuario, Cajero_idUsuario1, TipoVenta_idTipoVenta, documentodeventa_idDocumentoDeVenta, mediopago_idMedioPago,productos){
        const sql = `INSERT INTO venta (fechaVenta,
                                        totalVenta,
                                        Cliente_idUsuario,
                                        Cajero_idUsuario1,
                                        TipoVenta_idTipoVenta,
                                        documentodeventa_idDocumentoDeVenta,
                                        mediopago_idMedioPago)
                                        VALUES
                                        (NOW(),?,?,?,?,?,?)`;
        let resp = await this.consulta(sql,[ totalVenta, Cliente_idUsuario, Cajero_idUsuario1, TipoVenta_idTipoVenta, documentodeventa_idDocumentoDeVenta, mediopago_idMedioPago]);
        resp = JSON.parse(JSON.stringify(resp));
        const idVenta = resp.insertId;
        productos.forEach(async producto => {
            await detalleVenta.insertar(producto.cantidad, producto.precioVentaProducto, idVenta, producto.idProducto, producto.Estado_idEstado);
            await objetoProducto.descontarProducto(producto.idProducto, producto.cantidad);
        });
        let venta = await this.buscarUnaVenta(idVenta);
        venta = JSON.parse(JSON.stringify(venta));
        return{
            idVenta,
            fechaVenta : venta[0].fechaVenta
        }
    }
    editar(fechaVenta, totalVenta, Cliente_idUsuario, Cajero_idUsuario1, TipoVenta_idTipoVenta, documentodeventa_idDocumentoDeVenta, mediopago_idMedioPago,idVenta){
        const sql = "UPDATE `venta` "
                                +"SET "
                                +"fechaVenta= ? "
                                +",totalVenta= ? "
                                +",Cliente_idUsuario= ? "
                                +",Cajero_idUsuario1= ? "
                                +",TipoVenta_idTipoVenta= ? "
                                +",documentodeventa_idDocumentoDeVenta= ? "
                                +",mediopago_idMedioPago= ? "
                    +" WHERE idVenta = ? ";
        return this.consulta(sql,[fechaVenta, totalVenta, Cliente_idUsuario, Cajero_idUsuario1, TipoVenta_idTipoVenta, documentodeventa_idDocumentoDeVenta, mediopago_idMedioPago,idVenta]);
    }
    async eliminar(idVenta){
        const sql = "DELETE FROM `venta` WHERE `idVenta` = ? ";
        var resp = await this.consulta(sql,[idVenta]);
        return resp;
    }
}
module.exports =  Venta;