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
router.put("/insertar",(req, res)=>{
    const { body } = req;
    const { nombreFamilia }= body;
    RouterRespuestas(
                    async ()=> await familia.insertar(nombreFamilia),
                    res
                    );
});
module.exports = router;