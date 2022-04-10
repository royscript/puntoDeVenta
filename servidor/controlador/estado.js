const router = require('express').Router();
const Estado = require('../modelo/Estado');
const RouterRespuestas = require('../utils/RouterRespuestas');
const estado = new Estado();

router.get("/listar",(req, res)=>{
    RouterRespuestas(
                    async ()=> await estado.listar(),
                    res
                    );
});
module.exports = router;