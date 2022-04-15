const router = require('express').Router();
const Venta = require('../modelo/Venta');
const RouterRespuestas = require('../utils/RouterRespuestas');
const venta = new Venta();

router.get("/listar",(req, res)=>{
    RouterRespuestas(
                    async ()=> await venta.listar(),
                    res
                    );
});
router.post("/listar",(req, res)=>{
    const { body } = req;
    const { pagSiguiente, cantPorPag, search }= body;
    RouterRespuestas(
                    async ()=> await venta.listarConParametros(pagSiguiente, cantPorPag, search),
                    res
                    );
});
router.post("/buscar-venta",(req, res)=>{
    const { body } = req;
    const { idVenta }= body;
    RouterRespuestas(
                    async ()=> await venta.buscarUnaVenta(idVenta),
                    res
                    );
});
router.put("/insertar",(req, res)=>{
    const { body } = req;
    const { fechaVenta, totalVenta, Cliente_idUsuario, Cajero_idUsuario1, TipoVenta_idTipoVenta, documentodeventa_idDocumentoDeVenta, mediopago_idMedioPago, detalleVenta }= body;
    RouterRespuestas(
                    async ()=> await venta.insertar(fechaVenta, totalVenta, Cliente_idUsuario, Cajero_idUsuario1, TipoVenta_idTipoVenta, documentodeventa_idDocumentoDeVenta, mediopago_idMedioPago, detalleVenta),
                    res
                    );
});
router.put("/editar",(req, res)=>{
    const { body } = req;
    const { nombreTipoVenta,idTipoVenta }= body;
    RouterRespuestas(
                    async ()=> await venta.editar(nombreTipoVenta,idTipoVenta),
                    res
                    );
});
router.post("/eliminar",(req, res)=>{
    const { body } = req;
    const { id }= body;
    RouterRespuestas(
                    async ()=> await venta.eliminar(id),
                    res
                    );
});
module.exports = router;