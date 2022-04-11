const mysql = require('../conexiones/conexionMysql');
class DocumentoCompra extends mysql{
    constructor(){
        super();
        this.usuariosOnline = [];
    }

    listar(){
        return this.consulta("SELECT * FROM documentocompra");
    }
    async listarConParametros(pagSiguiente, cantPorPag, search){
        var where = ''; 
        var parametrosBuscar = [];
        if(search){
            parametrosBuscar = ['%'+search+'%'];
            where = ` WHERE nombreDocumentoCompra LIKE ? `;
            pagSiguiente = 1;//Cuando se realiza una busqueda comienza con la pagina 1
        }
        let resp = {
            datos : await this.consulta("SELECT * FROM documentocompra "+where+" "+this.paginador(pagSiguiente, cantPorPag),parametrosBuscar),
            cantidad : await this.consulta("SELECT count(idDocumentoCompra) as cantidad FROM documentocompra "+where+" ",parametrosBuscar)
        }
        return resp;
    }
    insertar(nombreDocumentoCompra){
        const sql = "INSERT INTO documentocompra (nombreDocumentoCompra) VALUES (?)";
        return this.consulta(sql,[nombreDocumentoCompra]);
    }
    editar(nombreDocumentoCompra,idDocumentoCompra){
        const sql = "UPDATE documentocompra "
                                +"SET "
                                +"nombreDocumentoCompra= ? "
                    +" WHERE idDocumentoCompra = ? ";
        return this.consulta(sql,[nombreDocumentoCompra,idDocumentoCompra]);
    }
    async eliminar(idDocumentoCompra){
        const sql = "DELETE FROM `documentocompra` WHERE `idDocumentoCompra` = ? ";
        var resp = await this.consulta(sql,[idDocumentoCompra]);
        return resp;
    }
}
module.exports =  DocumentoCompra;