const mysql = require('../conexiones/conexionMysql');
class DocumentoDeVenta extends mysql{
    constructor(){
        super();
        this.usuariosOnline = [];
    }

    listar(){
        return this.consulta("SELECT * FROM documentodeventa");
    }
    async listarConParametros(pagSiguiente, cantPorPag, search){
        var where = ''; 
        var parametrosBuscar = [];
        if(search){
            parametrosBuscar = ['%'+search+'%'];
            where = ` WHERE nombreDocumentoDeVenta LIKE ? `;
            pagSiguiente = 1;//Cuando se realiza una busqueda comienza con la pagina 1
        }
        let resp = {
            datos : await this.consulta("SELECT * FROM documentodeventa "+where+" "+this.paginador(pagSiguiente, cantPorPag),parametrosBuscar),
            cantidad : await this.consulta("SELECT count(idDocumentoDeVenta) as cantidad FROM documentodeventa "+where+" ",parametrosBuscar)
        }
        return resp;
    }
    insertar(nombreDocumentoDeVenta){
        const sql = "INSERT INTO documentodeventa (nombreDocumentoDeVenta) VALUES (?)";
        return this.consulta(sql,[nombreDocumentoDeVenta]);
    }
    editar(nombreDocumentoDeVenta,idDocumentoDeVenta){
        const sql = "UPDATE documentodeventa "
                                +"SET "
                                +"nombreDocumentoDeVenta= ? "
                    +" WHERE idDocumentoDeVenta = ? ";
        return this.consulta(sql,[nombreDocumentoDeVenta,idDocumentoDeVenta]);
    }
    async eliminar(idDocumentoDeVenta){
        const sql = "DELETE FROM `documentodeventa` WHERE `idDocumentoDeVenta` = ? ";
        var resp = await this.consulta(sql,[idDocumentoDeVenta]);
        return resp;
    }
}
module.exports =  DocumentoDeVenta;