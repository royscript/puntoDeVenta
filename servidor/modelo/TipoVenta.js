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
    insertar(nombreTipoVenta, EstadoDinero_idEstadoDinero){
        const sql = "INSERT INTO tipoventa (nombreTipoVenta, EstadoDinero_idEstadoDinero) VALUES (?,?)";
        return this.consulta(sql,[nombreTipoVenta, EstadoDinero_idEstadoDinero]);
    }
    editar(nombreTipoVenta,EstadoDinero_idEstadoDinero,idTipoVenta){
        const sql = "UPDATE tipoventa "
                                +"SET "
                                +"nombreTipoVenta= ? "
                                +", EstadoDinero_idEstadoDinero = ? "
                    +" WHERE idTipoVenta = ? ";
        return this.consulta(sql,[nombreTipoVenta,EstadoDinero_idEstadoDinero,idTipoVenta]);
    }
    async eliminar(idTipoVenta){
        const sql = "DELETE FROM `tipoventa` WHERE `idTipoVenta` = ? ";
        var resp = await this.consulta(sql,[idTipoVenta]);
        return resp;
    }
}
module.exports =  TipoVenta;