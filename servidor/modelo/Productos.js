const mysql = require('../conexiones/conexionMysql');
class Productos extends mysql{
    constructor(){
        super();
        this.usuariosOnline = [];
    }
    async buscar(codigoBuscar){
        return await this.consulta("SELECT * FROM producto WHERE codigoBarraProducto LIKE ?",[codigoBuscar]);
    }
    async listarTodos(){
        return await this.consulta(`SELECT *
                                    FROM producto P
                                    INNER JOIN familia F
                                    on(P.Familia_idFamilia=F.idFamilia)`);
    }
    async listar(pagSiguiente, cantPorPag, search, paraVentas = false){
        var where = ''; 
        var parametrosBuscar = [];
        if(paraVentas===true){
            where = ' WHERE Estado_idEstado = 1'; 
        }
        if(search){
            parametrosBuscar = [search,'%'+search+'%'];
            if(paraVentas===true){
                where = ` WHERE (codigoBarraProducto LIKE ? OR nombreProducto LIKE ?) AND Estado_idEstado = 1`;
            }else{
                where = ` WHERE codigoBarraProducto LIKE ? OR nombreProducto LIKE ? `;
            }
            pagSiguiente = 1;//Cuando se realiza una busqueda comienza con la pagina 1
        }
        let resp = {
            datos : await this.consulta("SELECT * FROM producto "+where+" "+this.paginador(pagSiguiente, cantPorPag),parametrosBuscar),
            cantidad : await this.consulta("SELECT count(idProducto) as cantidad FROM producto "+where+" ",parametrosBuscar)
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
    descontarProducto(idProducto, cantidad){
        const sql = "UPDATE producto "
                                +"SET "
                                +"cantidadProducto = cantidadProducto - ? "
                    +" WHERE idProducto = ? ";
        return this.consulta(sql,[parseInt(cantidad),idProducto]);
    }
    agregarProducto(idProducto, cantidad){
        const sql = "UPDATE producto "
                                +"SET "
                                +"cantidadProducto = cantidadProducto + ? "
                    +" WHERE idProducto = ? ";
        return this.consulta(sql,[parseInt(cantidad),idProducto]);
    }
    async eliminar(idProducto){
        const sql = "DELETE FROM `producto` WHERE `producto`.`idProducto` = ? ";
        //console.log(sql, idProducto);
        var resp = await this.consulta(sql,[idProducto]);
        return resp;
    }
}
module.exports =  Productos;