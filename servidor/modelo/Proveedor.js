const mysql = require('../conexiones/conexionMysql');
class Proveedor extends mysql{
    constructor(){
        super();
    }

    listar(){
        return this.consulta("SELECT * FROM proveedor");
    }

    async listarConFiltro(pagSiguiente, cantPorPag, search){
        var where = ''; 
        var parametrosBuscar = [];
        if(search){
            parametrosBuscar = ['%'+search+'%','%'+search+'%',search];
            where = ` WHERE razonSocialProveedor LIKE ? OR contactoProveedor LIKE ? OR rutProveedor LIKE ? `;
            pagSiguiente = 1;//Cuando se realiza una busqueda comienza con la pagina 1
        }
        let resp = {
            datos : await this.consulta("SELECT * FROM proveedor "+where+" "+this.paginador(pagSiguiente, cantPorPag),parametrosBuscar),
            cantidad : await this.consulta("SELECT count(idProveedor) as cantidad FROM proveedor "+where+" ",parametrosBuscar)
        }
        return resp;
    }
    insertar(razonSocialProveedor, contactoProveedor,direccionProveedor, telefonoProveedor,rutProveedor){
        const sql = "INSERT INTO proveedor (razonSocialProveedor, contactoProveedor,"
                                            +"direccionProveedor, telefonoProveedor,"
                                            +"rutProveedor) "
                                            +"VALUES (?,?,?,?,?)";
        return this.consulta(sql,[razonSocialProveedor, contactoProveedor,direccionProveedor, telefonoProveedor,rutProveedor]);
    }
    editar(razonSocialProveedor, contactoProveedor,direccionProveedor, telefonoProveedor,rutProveedor,idProveedor){
        const sql = "UPDATE proveedor "
                                +"SET "
                                +"razonSocialProveedor= ? "
                                +",contactoProveedor= ? "
                                +",direccionProveedor= ? "
                                +",telefonoProveedor= ? "
                                +",rutProveedor= ? "
                    +" WHERE idProveedor = ? ";
        return this.consulta(sql,[razonSocialProveedor, contactoProveedor,direccionProveedor, telefonoProveedor,rutProveedor,idProveedor]);
    }
    async eliminar(idProveedor){
        const sql = "DELETE FROM `proveedor` WHERE `proveedor`.`idProveedor` = ? ";
        //console.log(sql, idProducto);
        var resp = await this.consulta(sql,[idProveedor]);
        return resp;
    }
}
module.exports =  Proveedor;