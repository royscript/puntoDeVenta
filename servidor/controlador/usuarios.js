const router = require('express').Router();
const Usuarios = require('../modelo/Usuarios');
const RouterRespuestas = require('../utils/RouterRespuestas');
const usuario = new Usuarios();
const verificarJWT = require('../controlador/verificarJWT');

router.get("/listar",verificarJWT,(req, res)=>{
    RouterRespuestas(
                    async ()=> await usuario.listar(),
                    res
                    );
});
module.exports = router;