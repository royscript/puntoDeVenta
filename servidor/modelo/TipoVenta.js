const mysql = require('../conexiones/conexionMysql');
class TipoVenta extends mysql{
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
            where = ` WHERE nombreTipoVenta LIKE ? `;
            pagSiguiente = 1;//Cuando se realiza una busqueda comienza con la pagina 1
        }
        let resp = {
            datos : await this.consulta("SELECT * FROM tipoventa "+where+" "+this.paginador(pagSiguiente, cantPorPag),parametrosBuscar),
            cantidad : await this.consulta("SELECT count(idTipoVenta) as cantidad FROM tipoventa "+where+" ",parametrosBuscar)
        }
        return resp;
    }
    insertar(nombreTipoVenta){
        const sql = "INSERT INTO tipoventa (nombreTipoVenta) VALUES (?)";
        return this.consulta(sql,[nombreTipoVenta]);
    }
    editar(nombreTipoVenta,idTipoVenta){
        const sql = "UPDATE tipoventa "
                                +"SET "
                                +"nombreTipoVenta= ? "
                    +" WHERE idTipoVenta = ? ";
        return this.consulta(sql,[nombreTipoVenta,idTipoVenta]);
    }
    async eliminar(idTipoVenta){
        const sql = "DELETE FROM `tipoventa` WHERE `idTipoVenta` = ? ";
        var resp = await this.consulta(sql,[idTipoVenta]);
        return resp;
    }
}
module.exports =  TipoVenta;