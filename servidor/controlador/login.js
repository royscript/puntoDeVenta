const router = require('express').Router();
const Usuarios = require('../modelo/Usuarios');
const RouterRespuestas = require('../utils/RouterRespuestas');
const usuario = new Usuarios();

router.post("/login",(req, res)=>{
    const { body } = req;
    const { rutUsuario, contrasena }= body;
    console.log(body);
    console.log('body');
    RouterRespuestas(
                    async ()=> await usuario.login(rutUsuario,contrasena),
                    res
                    );
});

module.exports = router;