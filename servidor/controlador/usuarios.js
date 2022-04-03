const router = require('express').Router();
const Usuarios = require('../modelo/Usuarios');
const RouterRespuestas = require('../utils/RouterRespuestas');
const usuario = new Usuarios();

router.get("/listar",(req, res)=>{
    RouterRespuestas(
                    async ()=> await usuario.listar(),
                    res
                    );
});
module.exports = router;