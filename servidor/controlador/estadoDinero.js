const router = require('express').Router();
const EstadoDinero = require('../modelo/EstadoDinero');
const RouterRespuestas = require('../utils/RouterRespuestas');
const estadoDinero = new EstadoDinero();

router.get("/listar",(req, res)=>{
    RouterRespuestas(
                    async ()=> await estadoDinero.listar(),
                    res
                    );
});
module.exports = router;