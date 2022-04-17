const router = require('express').Router();
const TipoVenta = require('../modelo/TipoVenta');
const RouterRespuestas = require('../utils/RouterRespuestas');
const tipoVenta = new TipoVenta();

router.get("/listar",(req, res)=>{
    RouterRespuestas(
                    async ()=> await tipoVenta.listar(),
                    res
                    );
});
router.post("/listar",(req, res)=>{
    const { body } = req;
    const { pagSiguiente, cantPorPag, search }= body;
    RouterRespuestas(
                    async ()=> await tipoVenta.listarConParametros(pagSiguiente, cantPorPag, search),
                    res
                    );
});
router.put("/insertar",(req, res)=>{
    const { body } = req;
    const { nombreTipoVenta, EstadoDinero_idEstadoDinero }= body;
    RouterRespuestas(
                    async ()=> await tipoVenta.insertar(nombreTipoVenta, EstadoDinero_idEstadoDinero),
                    res
                    );
});
router.put("/editar",(req, res)=>{
    const { body } = req;
    const { nombreTipoVenta,idTipoVenta,EstadoDinero_idEstadoDinero }= body;
    RouterRespuestas(
                    async ()=> await tipoVenta.editar(nombreTipoVenta,EstadoDinero_idEstadoDinero,idTipoVenta),
                    res
                    );
});
router.post("/eliminar",(req, res)=>{
    const { body } = req;
    const { id }= body;
    RouterRespuestas(
                    async ()=> await tipoVenta.eliminar(id),
                    res
                    );
});
module.exports = router;