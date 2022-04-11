const mysql = require('../conexiones/conexionMysql');
class Familia extends mysql{
    constructor(){
        super();
        this.usuariosOnline = [];
    }

    listar(){
        return this.consulta("SELECT * FROM familia");
    }
    async listarConParametros(pagSiguiente, cantPorPag, search){
        var where = ''; 
        var parametrosBuscar = [];
        if(search){
            parametrosBuscar = ['%'+search+'%'];
            where = ` WHERE nombreFamilia LIKE ? `;
            pagSiguiente = 1;//Cuando se realiza una busqueda comienza con la pagina 1
        }
        let resp = {
            datos : await this.consulta("SELECT * FROM familia "+where+" "+this.paginador(pagSiguiente, cantPorPag),parametrosBuscar),
            cantidad : await this.consulta("SELECT count(idFamilia) as cantidad FROM familia "+where+" ",parametrosBuscar)
        }
        return resp;
    }
    insertar(nombreFamilia){
        const sql = "INSERT INTO familia (nombreFamilia) VALUES (?)";
        return this.consulta(sql,[nombreFamilia]);
    }
    editar(nombreFamilia,idFamilia){
        const sql = "UPDATE familia "
                                +"SET "
                                +"nombreFamilia= ? "
                    +" WHERE idFamilia = ? ";
        return this.consulta(sql,[nombreFamilia,idFamilia]);
    }
    async eliminar(idFamilia){
        const sql = "DELETE FROM `familia` WHERE `idFamilia` = ? ";
        var resp = await this.consulta(sql,[idFamilia]);
        return resp;
    }
}
module.exports =  Familia;