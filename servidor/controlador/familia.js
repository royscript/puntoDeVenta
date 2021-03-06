const router = require('express').Router();
const Familia = require('../modelo/FamiliaProducto');
const RouterRespuestas = require('../utils/RouterRespuestas');
const familia = new Familia();

router.get("/listar",(req, res)=>{
    RouterRespuestas(
                    async ()=> await familia.listar(),
                    res
                    );
});
router.post("/listar",(req, res)=>{
    const { body } = req;
    const { pagSiguiente, cantPorPag, search }= body;
    RouterRespuestas(
                    async ()=> await familia.listarConParametros(pagSiguiente, cantPorPag, search),
                    res
                    );
});
router.put("/insertar",(req, res)=>{
    const { body } = req;
    const { nombreFamilia }= body;
    RouterRespuestas(
                    async ()=> await familia.insertar(nombreFamilia),
                    res
                    );
});
router.put("/editar",(req, res)=>{
    const { body } = req;
    const { nombreFamilia,idFamilia }= body;
    RouterRespuestas(
                    async ()=> await familia.editar(nombreFamilia,idFamilia),
                    res
                    );
});
router.post("/eliminar",(req, res)=>{
    const { body } = req;
    const { id }= body;
    RouterRespuestas(
                    async ()=> await familia.eliminar(id),
                    res
                    );
});
module.exports = router;