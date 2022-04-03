const router = require('express').Router();
const Usuarios = require('../modelo/Usuarios');
const usuario = new Usuarios();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const UsuariosOnline = require('../modelo/UsuariosOnline');
usuarioOnline = new UsuariosOnline();

router.post("/login", async (req, res)=>{
    const { body } = req;
    const { rutUsuario, contrasena }= body;
    const respuesta = await usuario.login(rutUsuario,contrasena);
    const usuarioConsultado = Object.values(JSON.parse(JSON.stringify(respuesta)))[0];
    if(usuarioConsultado!=undefined){
        //Creamos los token de acceso
        const accessToken = jwt.sign(
            { "idUsuario" : usuarioConsultado.idUsuario },
            process.env.ACCESS_TOKEN_SECRETO,
            { expiresIn : '5h'}
        );
        const refreshToken = jwt.sign(
            { "idUsuario" : usuarioConsultado.idUsuario },
            process.env.REFRESH_TOKEN_SECRETO,
            { expiresIn : '1d'}
        );
        //Registramos a los usuarios con token
        usuarioOnline.setUsuariosOnline(usuarioConsultado,refreshToken)
        //Guardamos el jwt en una cockie que dura un dia
        res.cookie('jwt',refreshToken,{ httpOnly : true, sameSite : 'None', secure : true, maxAge : 24 * 60 * 60 * 1000});
        res.json({accessToken, 
                    idUsuario : usuarioConsultado.idUsuario, 
                    nombreUsuario : usuarioConsultado.nombreUsuario, 
                    apellidoUsuario : usuarioConsultado.apellidoUsuario, 
                    rutUsuario : usuarioConsultado.rutUsuario,
                    Permiso_idPermiso : usuarioConsultado.Permiso_idPermiso});
        //console.log(await usuarioOnline.listar());
    }else{
        res.sendStatus(401);
    }
});

module.exports = router;