const jwt = require('jsonwebtoken');
require('dotenv').config();

const verificarJWT = (req, res, next)=>{
    console.log("verificarJWT");
    const authHeader = req.headers['authorization'];
    //console.log(req);
    console.log(authHeader);
    if(!authHeader) return res.sendStatus(401);
    console.log("Token encontrado");
    const token = authHeader.split(' ')[1];
    console.log(token);
    jwt.verify(
        authHeader,
        process.env.ACCESS_TOKEN_SECRETO,
        (err, decoded)=>{
            if(err) return res.sendStatus(403); //invalid token
            req.user = decoded.rutUsuario;
            next();
        }
    )
}
module.exports = verificarJWT;