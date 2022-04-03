//--------IMPORTACIONES------------
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const Usuarios = require('./controlador/usuarios');
const Login = require('./controlador/login');
const Permisos = require('./controlador/permisos');
const verificarJWT = require('./middleware/verificarJWT');
const cookieParser = require('cookie-parser');
const refrescarJWT = require('./middleware/refrescarJWT');
const logoutToken = require('./middleware/logoutToken');
const credenciales = require('./middleware/credenciales');
const corsOptions = require('./middleware/corsOptions');

//--------MIDDLEWARE-----------
app.use(credenciales);//Esto es para limitar quienes pueden acceder a la aplicaciòn, no es obligatorio
app.use(cors(corsOptions));//Para intercambiar recursos entre cliente y servidor, el argumento no es obligacion
app.use(express.json());//Para los JSON
app.use(bodyParser.urlencoded({ extended : true }));//para enviar los formularios al servidor
app.use(cookieParser());//Para las cookies

//-------LLAMADAS API----------
app.use('/api/', logoutToken);
app.use('/api/', refrescarJWT);
app.use('/api/', Login);
app.use(verificarJWT);//Los que estan bajo este middleware requeriran autenticacion
app.use('/api/usuario/', Usuarios);
app.use('/api/permisos/', Permisos);


//------SUBIR APP--------------
app.listen(process.env.PORT_NODE, ()=>{
    console.log("nodejs server puerto "+process.env.PORT_NODE+" (corriendo)");
});