const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const Usuarios = require('./controlador/usuarios');
const Login = require('./controlador/login');
const jwt = require('jsonwebtoken');


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended : true }));


app.use('/api/usuario/', Usuarios);
app.use('/api/', Login);

app.listen(process.env.PORT_NODE, ()=>{
    console.log("running on "+process.env.PORT_NODE);
});