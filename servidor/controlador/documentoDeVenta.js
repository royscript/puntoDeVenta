const router = require('express').Router();
const DocumentoDeVenta = require('../modelo/DocumentoDeVenta');
const RouterRespuestas = require('../utils/RouterRespuestas');
const documentoDeVenta = new DocumentoDeVenta();

router.get("/listar",(req, res)=>{
    RouterRespuestas(
                    async ()=> await documentoDeVenta.listar(),
                    res
                    );
});
router.post("/listar",(req, res)=>{
    const { body } = req;
    const { pagSiguiente, cantPorPag, search }= body;
    RouterRespuestas(
                    async ()=> await documentoDeVenta.listarConParametros(pagSiguiente, cantPorPag, search),
                    res
                    );
});
router.put("/insertar",(req, res)=>{
    const { body } = req;
    const { nombreDocumentoDeVenta }= body;
    RouterRespuestas(
                    async ()=> await documentoDeVenta.insertar(nombreDocumentoDeVenta),
                    res
                    );
});
router.put("/editar",(req, res)=>{
    const { body } = req;
    const { nombreDocumentoDeVenta,idDocumentoDeVenta }= body;
    RouterRespuestas(
                    async ()=> await documentoDeVenta.editar(nombreDocumentoDeVenta,idDocumentoDeVenta),
                    res
                    );
});
router.post("/eliminar",(req, res)=>{
    const { body } = req;
    const { id }= body;
    RouterRespuestas(
                    async ()=> await documentoDeVenta.eliminar(id),
                    res
                    );
});
module.exports = router;