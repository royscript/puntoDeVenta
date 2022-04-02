const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const app = express();
const Usuarios = require('./controlador/usuarios');


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended : true }));

app.use('/api/usuario/', Usuarios);

app.listen(process.env.PORT_NODE, ()=>{
    console.log("running on "+process.env.PORT_NODE);
});