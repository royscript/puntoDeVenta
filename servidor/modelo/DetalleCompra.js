const mysql = require('../conexiones/conexionMysql');
const Productos = require('./Productos');
const Compra = require('./Compra');
const objetoProducto = new Productos();
const objetoCompra = new Compra();
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
                                            ON(DC.Producto_idProducto=P.idProducto)
                                            INNER JOIN compra C
                                            ON(DC.Compra_idCompra=C.idCompra)
                                            `+where+" "+this.paginador(pagSiguiente, cantPorPag),parametrosBuscar),
            cantidad : await this.consulta(`SELECT count(DC.Compra_idCompra) as cantidad 
                                            FROM detallecompra DC
                                            INNER JOIN producto P
                                            ON(DC.Producto_idProducto=P.idProducto)
                                            INNER JOIN compra C
                                            ON(DC.Compra_idCompra=C.idCompra)`+where+" ",parametrosBuscar)
        }
        return resp;
    }
    async insertar(nombreProducto, valorProducto, cantidad, Estado_idEstado, Familia_idFamilia, precioVentaProducto, codigoBarraProducto, Compra_idCompra){
        var resp = await objetoProducto.buscar(codigoBarraProducto);
        resp = JSON.parse(JSON.stringify(resp));
        var idProducto = null;
        if(resp.length>0){//Si existe el Producto lo modificamos
            //resp.cantidadProducto esta es la cantidad que tenia el producto en la bd
            await objetoProducto.editar(nombreProducto, valorProducto,resp.cantidadProducto, Estado_idEstado,Familia_idFamilia, precioVentaProducto,resp.idProducto, codigoBarraProducto)
            idProducto = resp[0].idProducto;
        }else{
            //Si es nuevo el producto lo ingresamos sin la cantidad
            const ingresoResp = await objetoProducto.insertar(nombreProducto,valorProducto,0,Estado_idEstado,Familia_idFamilia,precioVentaProducto,codigoBarraProducto);
            idProducto = JSON.parse(JSON.stringify(ingresoResp)).insertId;
        }
        //Al final capturamos el id del producto y lo ingresamos a la tabla
        const sql = "INSERT INTO detallecompra (cantidadDetalleCompra, valorDetalleCompra, Producto_idProducto,Producto_Estado_idEstado, Compra_idCompra) VALUES (?,?,?,?,?)";
        return this.consulta(sql,[cantidad, valorProducto, idProducto,Estado_idEstado, Compra_idCompra]);
    }
    async actualizarStocks (Compra_idCompra){
        let consulta = await this.consulta("SELECT * FROM puntodeventa.detallecompra WHERE Compra_idCompra = ?",[Compra_idCompra]);
        consulta = JSON.parse(JSON.stringify(consulta));
        consulta.forEach(async producto => {
            await objetoProducto.agregarProducto(producto.Producto_idProducto,producto.cantidadDetalleCompra);
        });
        await objetoCompra.stockActualizado(Compra_idCompra,'SI');
        return true;
    }
    async editar(nombreProducto, valorProducto, cantidad, Estado_idEstado, Familia_idFamilia, precioVentaProducto, codigoBarraProducto, Compra_idCompra,idDetalleCompra){
        var resp = await objetoProducto.buscar(codigoBarraProducto);
        resp = JSON.parse(JSON.stringify(resp));
        var idProducto = null;
        if(resp.length>0){//Si existe el Producto lo modificamos
            //resp.cantidadProducto esta es la cantidad que tenia el producto en la bd
            await objetoProducto.editar(nombreProducto, valorProducto,resp.cantidadProducto, Estado_idEstado,Familia_idFamilia, precioVentaProducto,resp.idProducto, codigoBarraProducto)
            idProducto = resp[0].idProducto;
        }else{
            //Si es nuevo el producto lo ingresamos sin la cantidad
            const ingresoResp = await objetoProducto.insertar(nombreProducto,valorProducto,0,Estado_idEstado,Familia_idFamilia,precioVentaProducto,codigoBarraProducto);
            idProducto = JSON.parse(JSON.stringify(ingresoResp)).insertId;
        }
        //Al final capturamos el id del producto y lo ingresamos a la tabla
        const sql = "UPDATE detallecompra "
                                +"SET "
                                +"cantidadDetalleCompra= ?, "
                                +"valorDetalleCompra= ?, "
                                +"Producto_idProducto= ?, "
                                +"Producto_Estado_idEstado= ?,"
                                +"Compra_idCompra= ? "
                    +" WHERE idDetalleCompra = ? ";
        return this.consulta(sql,[cantidad, valorProducto, idProducto,Estado_idEstado, Compra_idCompra,idDetalleCompra]);
    }
    async eliminar(idDetalleCompra){
        const sql = "DELETE FROM `detallecompra` WHERE `idDetalleCompra` = ? ";
        var resp = await this.consulta(sql,[idDetalleCompra]);
        return resp;
    }
}
module.exports =  DetalleCompra;