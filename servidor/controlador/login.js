const router = require('express').Router();
const Usuarios = require('../modelo/Usuarios');
const RouterRespuestas = require('../utils/RouterRespuestas');
const usuario = new Usuarios();
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post("/login", async (req, res)=>{
    const { body } = req;
    const { rutUsuario, contrasena }= body;
    const respuesta = await usuario.login(rutUsuario,contrasena);
    const usuarioConsultado = Object.values(JSON.parse(JSON.stringify(respuesta)))[0];
    if(usuarioConsultado.idUsuario){
        //Creamos los token de acceso
        const accessToken = jwt.sign(
            { "username" : usuarioConsultado.rutUsuario },
            process.env.ACCESS_TOKEN_SECRETO,
            { expiresIn : '5h'}
        );
        const refreshToken = jwt.sign(
            { "username" : usuarioConsultado.rutUsuario },
            process.env.REFRESH_TOKEN_SECRETO,
            { expiresIn : '1d'}
        );
        //Registramos a los usuarios con token
        usuario.setUsuariosOnline(usuarioConsultado,refreshToken);
        //Guardamos el jwt en una cockie que dura un dia
        res.cookie('jwt',refreshToken,{ httpOnly : true, maxAge : 24 * 60 * 60 * 1000});
        res.json({accessToken});
        console.log(usuario.getUsuariosOnline());
    }else{
        res.sendStatus(403);
    }
    /*RouterRespuestas(
                    async ()=> ,
                    res
                    );*/
});

module.exports = router;