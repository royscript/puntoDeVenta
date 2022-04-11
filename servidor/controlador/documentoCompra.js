const router = require('express').Router();
const DocumentoCompra = require('../modelo/DocumentoCompra');
const RouterRespuestas = require('../utils/RouterRespuestas');
const documentoCompra = new DocumentoCompra();

router.get("/listar",(req, res)=>{
    RouterRespuestas(
                    async ()=> await documentoCompra.listar(),
                    res
                    );
});
router.post("/listar",(req, res)=>{
    const { body } = req;
    const { pagSiguiente, cantPorPag, search }= body;
    RouterRespuestas(
                    async ()=> await documentoCompra.listarConParametros(pagSiguiente, cantPorPag, search),
                    res
                    );
});
router.put("/insertar",(req, res)=>{
    const { body } = req;
    const { nombreDocumentoCompra }= body;
    RouterRespuestas(
                    async ()=> await documentoCompra.insertar(nombreDocumentoCompra),
                    res
                    );
});
router.put("/editar",(req, res)=>{
    const { body } = req;
    const { nombreDocumentoCompra,idDocumentoCompra }= body;
    RouterRespuestas(
                    async ()=> await documentoCompra.editar(nombreDocumentoCompra,idDocumentoCompra),
                    res
                    );
});
router.post("/eliminar",(req, res)=>{
    const { body } = req;
    const { id }= body;
    RouterRespuestas(
                    async ()=> await documentoCompra.eliminar(id),
                    res
                    );
});
module.exports = router;