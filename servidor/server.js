require('dotenv').config()
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host : process.env.HOST,
    user : process.env.USER,
    password : process.env.PASSWORD,
    database : process.env.DATABASE
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended : true }));

app.post("/api/usuario/listar",(req, res)=>{

});

app.post("/api/usuario/insertar",(req, res)=>{
    const nombres = req.body.nombres;
    const apellidos = req.body.apellidos;
    const sql = "INSERT INTO `puntodeventa`.`usuario` "
                            +"(`nombreUsuario`, `apellidoUsuario`) "
                            +" VALUES (?, ?)";
    db.query(sql, [nombres,apellidos], (req, result)=>{
        res.send(result);
    })
});

app.get("/api/usuario/listar",(req, res)=>{
    const sql = "SELECT * FROM puntodeventa.usuario";
    db.query(sql, (req, result)=>{
        res.send(result);
    })
});

app.listen(process.env.PORT, ()=>{
    console.log("running on "+process.env.PORT);
});