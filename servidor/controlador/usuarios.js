const router = require('express').Router();
const bd = require('../conexiones/mysql');

router.post("/insertar",(req, res)=>{
    const nombres = req.body.nombres;
    const apellidos = req.body.apellidos;
    const sql = "INSERT INTO `puntodeventa`.`usuario` "
                            +"(`nombreUsuario`, `apellidoUsuario`) "
                            +" VALUES (?, ?)";
    bd.query(sql, [nombres,apellidos], (req, result)=>{
        res.send(result);
    })
});

router.get("/listar",(req, res)=>{
    const sql = "SELECT * FROM puntodeventa.usuario";
    bd.query(sql, (req, result)=>{
        res.send(result);
    })
});
module.exports = router;