const router = require('express').Router();
const Compra = require('../modelo/Compra');
const RouterRespuestas = require('../utils/RouterRespuestas');
const compra = new Compra();

router.get("/listar",(req, res)=>{
    RouterRespuestas(
                    async ()=> await compra.listar(),
                    res
                    );
});
router.post("/listar",(req, res)=>{
    const { body } = req;
    const { pagSiguiente, cantPorPag, search }= body;
    RouterRespuestas(
                    async ()=> await compra.listarConParametros(pagSiguiente, cantPorPag, search),
                    res
                    );
});
router.put("/insertar",(req, res)=>{
    const { body } = req;
    const { FechaCompra, FechaRegistroCompra, numeroDocumentoCompra, totalCompra, impuestoCompra, Usuario_idUsuario, DocumentoCompra_idDocumentoCompra, Proveedor_idProveedor }= body;
    RouterRespuestas(
                    async ()=> await compra.insertar(FechaCompra, FechaRegistroCompra, numeroDocumentoCompra, totalCompra, impuestoCompra, Usuario_idUsuario, DocumentoCompra_idDocumentoCompra, Proveedor_idProveedor),
                    res
                    );
});
router.put("/editar",(req, res)=>{
    const { body } = req;
    const { FechaCompra, FechaRegistroCompra, numeroDocumentoCompra, totalCompra, impuestoCompra, Usuario_idUsuario, DocumentoCompra_idDocumentoCompra, Proveedor_idProveedor, idCompra }= body;
    RouterRespuestas(
                    async ()=> await compra.editar(FechaCompra, FechaRegistroCompra, numeroDocumentoCompra, totalCompra, impuestoCompra, Usuario_idUsuario, DocumentoCompra_idDocumentoCompra, Proveedor_idProveedor, idCompra),
                    res
                    );
});
router.post("/eliminar",(req, res)=>{
    const { body } = req;
    const { id }= body;
    RouterRespuestas(
                    async ()=> await compra.eliminar(id),
                    res
                    );
});
module.exports = router;