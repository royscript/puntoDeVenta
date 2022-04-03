const router = require('express').Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const UsuariosOnline = require('../modelo/UsuariosOnline');
usuarioOnline = new UsuariosOnline();

router.post("/refreshToken",  (req, res)=>{
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.status(401).json({ 'message' : 'Token expirado' })
    const refreshToken = cookies.jwt;
    const usuarioEncontrado = usuarioOnline.verificarUsuarioOnline(refreshToken);
    if(!usuarioEncontrado) return res.sendStatus(403);
    //Evaluar jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRETO,
        (err, decoded) => {
            //Si hay alguna manipulacion que otro usuario use el token de acceso enviamos error
            if(err || usuarioEncontrado.idUsuario !== decoded.idUsuario) return res.sendStatus(403);
            //Creamos un nuevo token de accesso
            const accessToken = jwt.sign(
                { "idUsuario" : decoded.idUsuario },
                process.env.REFRESH_TOKEN_SECRETO,
                { expiresIn : '5h'}
            );
            //Enviamos al usuario el token como respuesta
            res.json({accessToken});
        }
    );
});

module.exports = router;