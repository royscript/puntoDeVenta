//--------IMPORTACIONES------------
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const Usuarios = require('./controlador/usuarios');
const Login = require('./controlador/login');
const jwt = require('jsonwebtoken');

//--------MIDDLEWARE-----------
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended : true }));

//-------LLAMADAS API----------
app.use('/api/usuario/', Usuarios);
app.use('/api/', Login);

//------SUBIR APP--------------
app.listen(process.env.PORT_NODE, ()=>{
    console.log("nodejs server puerto "+process.env.PORT_NODE+" (corriendo)");
});