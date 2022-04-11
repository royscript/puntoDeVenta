const mysql = require('../conexiones/conexionMysql');
class DetalleCompra extends mysql{
    constructor(){
        super();
        this.usuariosOnline = [];
    }

    listar(){
        return this.consulta("SELECT * FROM detallecompra");
    }
    async listarConParametros(pagSiguiente, cantPorPag, search){
        var where = ''; 
        var parametrosBuscar = [];
        if(search){
            parametrosBuscar = ['%'+search+'%'];
            where = ` WHERE numeroDocumentoCompra LIKE ? `;
            pagSiguiente = 1;//Cuando se realiza una busqueda comienza con la pagina 1
        }
        let resp = {
            datos : await this.consulta(`SELECT *
                                            FROM detallecompra DC
                                            INNER JOIN producto P
                                            INNER JOIN compra C
                                            ON(DC.Producto_idProducto=P.dProducto)
                                            ON(DC.Compra_idCompra=C.idCompra)
                                            `+where+" "+this.paginador(pagSiguiente, cantPorPag),parametrosBuscar),
            cantidad : await this.consulta(`SELECT count(DC.idDetalleCompra) as cantidad 
                                            FROM detallecompra DC
                                            INNER JOIN producto P
                                            INNER JOIN compra C
                                            ON(DC.Producto_idProducto=P.dProducto)
                                            ON(DC.Compra_idCompra=C.idCompra)`+where+" ",parametrosBuscar)
        }
        return resp;
    }
    insertar(cantidadDetalleCompra, valorDetalleCompra, Producto_idProducto, Compra_idCompra){
        const sql = "INSERT INTO detallecompra (cantidadDetalleCompra, valorDetalleCompra, Producto_idProducto, Compra_idCompra) VALUES (?,?,?,?)";
        return this.consulta(sql,[cantidadDetalleCompra, valorDetalleCompra, Producto_idProducto, Compra_idCompra]);
    }
    editar(cantidadDetalleCompra, valorDetalleCompra, Producto_idProducto, Compra_idCompra,idDetalleCompra){
        const sql = "UPDATE compra "
                                +"SET "
                                +"cantidadDetalleCompra= ?, "
                                +"valorDetalleCompra= ?, "
                                +"Producto_idProducto= ?, "
                                +"Compra_idCompra= ? "
                    +" WHERE idDetalleCompra = ? ";
        return this.consulta(sql,[cantidadDetalleCompra, valorDetalleCompra, Producto_idProducto, Compra_idCompra,idDetalleCompra]);
    }
    async eliminar(Compra_idCompra){
        const sql = "DELETE FROM `detallecompra` WHERE `Compra_idCompra` = ? ";
        var resp = await this.consulta(sql,[Compra_idCompra]);
        return resp;
    }
}
module.exports =  DetalleCompra;