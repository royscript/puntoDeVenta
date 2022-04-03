const router = require('express').Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const UsuariosOnline = require('../modelo/UsuariosOnline');
usuarioOnline = new UsuariosOnline();

router.post("/logoutToken",  (req, res)=>{
    //Solo del lado del cliente se elimina el token de accesso
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(204);//Significa exitoso pero sin contenido
    const refreshToken = cookies.jwt;
    //Esta el token en la bd?
    const usuarioEncontrado = usuarioOnline.verificarUsuarioOnline(refreshToken);
    if(!usuarioEncontrado) {
        //Si no teniamos un usuario pero teniamos una cookie del token debemos eliminarla
        res.clearCookie('jwt',{httpOnly: true, sameSite : 'None', secure : true});//Eliiminamos la cookie
        return res.sendStatus(204);//Significa exitoso pero sin contenido
    }
    //Si encontramos el mismo token en la bd debemos eliminarlo
    usuarioOnline.eliminarToken(refreshToken);
    res.clearCookie('jwt',{httpOnly: true, sameSite : 'None', secure : true});//Eliiminamos la cookie
    return res.sendStatus(204);//Significa exitoso pero sin contenido
});

module.exports = router;