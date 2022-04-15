const mysql = require('../conexiones/conexionMysql');
class Compra extends mysql{
    constructor(){
        super();
        this.usuariosOnline = [];
    }

    listar(){
        return this.consulta("SELECT * FROM compra");
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
            datos : await this.consulta(`SELECT DATE_FORMAT(FechaCompra,'%d/%m/%Y') as FechaCompra_formateada, DATE_FORMAT(FechaCompra,'%Y-%m-%d') as FechaCompra, 
                                                DATE_FORMAT(FechaRegistroCompra,'%d/%m/%Y') as FechaRegistroCompra_formateada,DATE_FORMAT(FechaRegistroCompra,'%Y-%m-%d') as FechaRegistroCompra,
                                                idUsuario, nombreUsuario, apellidoUsuario,
                                                idCompra, numeroDocumentoCompra, totalCompra, impuestoCompra, Usuario_idUsuario, DocumentoCompra_idDocumentoCompra, Proveedor_idProveedor,
                                                stockActualizado
                                            FROM compra C
                                            INNER JOIN usuario U
                                            ON(C.Usuario_idUsuario=U.idUsuario)`+where+" "+this.paginador(pagSiguiente, cantPorPag),parametrosBuscar),
            cantidad : await this.consulta(`SELECT count(idCompra) as cantidad 
                                            FROM compra C
                                            INNER JOIN usuario U
                                            ON(C.Usuario_idUsuario=U.idUsuario)`+where+" ",parametrosBuscar)
        }
        return resp;
    }
    insertar(FechaCompra, FechaRegistroCompra, numeroDocumentoCompra, totalCompra, impuestoCompra, Usuario_idUsuario, DocumentoCompra_idDocumentoCompra, Proveedor_idProveedor){
        const sql = "INSERT INTO compra (FechaCompra, FechaRegistroCompra, numeroDocumentoCompra, totalCompra, impuestoCompra, Usuario_idUsuario, DocumentoCompra_idDocumentoCompra, Proveedor_idProveedor) VALUES (NOW(),?,?,?,?,?,?,?)";
        return this.consulta(sql,[FechaRegistroCompra, numeroDocumentoCompra, totalCompra, impuestoCompra, Usuario_idUsuario, DocumentoCompra_idDocumentoCompra, Proveedor_idProveedor]);
    }
    editar(FechaCompra, FechaRegistroCompra, numeroDocumentoCompra, totalCompra, impuestoCompra, Usuario_idUsuario, DocumentoCompra_idDocumentoCompra, Proveedor_idProveedor,idCompra){
        const sql = "UPDATE compra "
                                +"SET "
                                +"FechaCompra= ?, "
                                +"FechaRegistroCompra= ?, "
                                +"numeroDocumentoCompra= ?, "
                                +"totalCompra= ?, "
                                +"impuestoCompra= ?, "
                                +"Usuario_idUsuario= ?, "
                                +"DocumentoCompra_idDocumentoCompra= ?, "
                                +"Proveedor_idProveedor= ? "
                    +" WHERE idCompra = ? ";
        return this.consulta(sql,[FechaCompra, FechaRegistroCompra, numeroDocumentoCompra, totalCompra, impuestoCompra, Usuario_idUsuario, DocumentoCompra_idDocumentoCompra, Proveedor_idProveedor,idCompra]);
    }
    stockActualizado(idCompra, estado){
        const sql = "UPDATE compra "
                                +"SET "
                                +"stockActualizado= ? "
                    +" WHERE idCompra = ? ";
        return this.consulta(sql,[estado, idCompra]);
    }
    async eliminar(idCompra){
        const sql = "DELETE FROM `compra` WHERE `idCompra` = ? ";
        var resp = await this.consulta(sql,[idCompra]);
        return resp;
    }
}
module.exports =  Compra;