const router = require('express').Router();
const MedioDePago = require('../modelo/MedioDePago');
const RouterRespuestas = require('../utils/RouterRespuestas');
const medioDePago = new MedioDePago();

router.get("/listar",(req, res)=>{
    RouterRespuestas(
                    async ()=> await medioDePago.listar(),
                    res
                    );
});
router.post("/listar",(req, res)=>{
    const { body } = req;
    const { pagSiguiente, cantPorPag, search }= body;
    RouterRespuestas(
                    async ()=> await medioDePago.listarConParametros(pagSiguiente, cantPorPag, search),
                    res
                    );
});
router.put("/insertar",(req, res)=>{
    const { body } = req;
    const { nombreMedioPago }= body;
    RouterRespuestas(
                    async ()=> await medioDePago.insertar(nombreMedioPago),
                    res
                    );
});
router.put("/editar",(req, res)=>{
    const { body } = req;
    const { nombreMedioPago,idMedioPago }= body;
    RouterRespuestas(
                    async ()=> await medioDePago.editar(nombreMedioPago,idMedioPago),
                    res
                    );
});
router.post("/eliminar",(req, res)=>{
    const { body } = req;
    const { id }= body;
    RouterRespuestas(
                    async ()=> await medioDePago.eliminar(id),
                    res
                    );
});
module.exports = router;