const mysql = require('../conexiones/conexionMysql');
class MedioDePago extends mysql{
    constructor(){
        super();
        this.usuariosOnline = [];
    }

    listar(){
        return this.consulta("SELECT * FROM mediopago");
    }
    async listarConParametros(pagSiguiente, cantPorPag, search){
        var where = ''; 
        var parametrosBuscar = [];
        if(search){
            parametrosBuscar = ['%'+search+'%'];
            where = ` WHERE nombreMedioPago LIKE ? `;
            pagSiguiente = 1;//Cuando se realiza una busqueda comienza con la pagina 1
        }
        let resp = {
            datos : await this.consulta("SELECT * FROM mediopago "+where+" "+this.paginador(pagSiguiente, cantPorPag),parametrosBuscar),
            cantidad : await this.consulta("SELECT count(idMedioPago) as cantidad FROM mediopago "+where+" ",parametrosBuscar)
        }
        return resp;
    }
    insertar(nombreMedioPago,seNecesitaIdDocumentoMedioPago){
        const sql = "INSERT INTO mediopago (nombreMedioPago,seNecesitaIdDocumentoMedioPago) VALUES (?,?)";
        return this.consulta(sql,[nombreMedioPago,seNecesitaIdDocumentoMedioPago]);
    }
    editar(nombreMedioPago,seNecesitaIdDocumentoMedioPago,idMedioPago){
        const sql = "UPDATE mediopago "
                                +"SET "
                                +"nombreMedioPago= ? "
                                +",seNecesitaIdDocumentoMedioPago= ?"
                    +" WHERE idMedioPago = ? ";
        return this.consulta(sql,[nombreMedioPago,seNecesitaIdDocumentoMedioPago,idMedioPago]);
    }
    async eliminar(idMedioPago){
        const sql = "DELETE FROM `mediopago` WHERE `idMedioPago` = ? ";
        var resp = await this.consulta(sql,[idMedioPago]);
        return resp;
    }
}
module.exports =  MedioDePago;