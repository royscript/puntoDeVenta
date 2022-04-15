const router = require('express').Router();
const DetalleCompra = require('../modelo/DetalleCompra');
const RouterRespuestas = require('../utils/RouterRespuestas');
const detalleCompra = new DetalleCompra();

router.get("/listar",(req, res)=>{
    RouterRespuestas(
                    async ()=> await detalleCompra.listar(),
                    res
                    );
});
router.post("/listar",(req, res)=>{
    const { body } = req;
    const { pagSiguiente, cantPorPag, search }= body;
    RouterRespuestas(
                    async ()=> await detalleCompra.listarConParametros(pagSiguiente, cantPorPag, search),
                    res
                    );
});
router.put("/insertar",(req, res)=>{
    const { body } = req;
    const { nombreProducto, valorProducto, cantidad, Estado_idEstado, Familia_idFamilia, precioVentaProducto, codigoBarraProducto, Compra_idCompra }= body;
    RouterRespuestas(
                    async ()=> await detalleCompra.insertar(nombreProducto, valorProducto, cantidad, Estado_idEstado, Familia_idFamilia, precioVentaProducto, codigoBarraProducto, Compra_idCompra),
                    res
                    );
});
router.put("/actualizar-stocks",(req, res)=>{
    const { body } = req;
    const { Compra_idCompra }= body;
    RouterRespuestas(
                    async ()=> await detalleCompra.actualizarStocks(Compra_idCompra),
                    res
                    );
});
router.put("/editar",(req, res)=>{
    const { body } = req;
    const { nombreProducto, valorProducto, cantidad, Estado_idEstado, Familia_idFamilia, precioVentaProducto, codigoBarraProducto, Compra_idCompra,idDetalleCompra }= body;
    RouterRespuestas(
                    async ()=> await detalleCompra.editar(nombreProducto, valorProducto, cantidad, Estado_idEstado, Familia_idFamilia, precioVentaProducto, codigoBarraProducto, Compra_idCompra,idDetalleCompra),
                    res
                    );
});
router.post("/eliminar",(req, res)=>{
    const { body } = req;
    const { id }= body;
    RouterRespuestas(
                    async ()=> await detalleCompra.eliminar(id),
                    res
                    );
});
module.exports = router;