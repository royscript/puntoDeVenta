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
//---------MODELO-------------
const Productos = require('./controlador/productos');
const FamiliaProducto = require('./controlador/familia');
const Estado = require('./controlador/estado');
const Proveedor = require('./controlador/proveedor');
const DocumentoCompra = require('./controlador/documentoCompra');
const Compra = require('./controlador/compra');
const DetalleCompra = require('./controlador/detalleCompra');
const TipoVenta = require('./controlador/tipoVenta');
const DocumentoDeVenta = require('./controlador/documentoDeVenta');
const MedioDePago = require('./controlador/medioDePago');
const Venta = require('./controlador/venta');
const EstadoDinero = require('./controlador/estadoDinero');
//----------------------------

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
//app.use(verificarJWT);//Los que estan bajo este middleware requeriran autenticacion
app.use('/api/usuario/', Usuarios);
app.use('/api/permisos/', Permisos);
app.use('/api/productos/', Productos);
app.use('/api/familia-producto/', FamiliaProducto);
app.use('/api/tipo-venta/', TipoVenta);
app.use('/api/documento-de-venta/', DocumentoDeVenta);
app.use('/api/venta/', Venta);
app.use('/api/medio-de-pago/', MedioDePago);
app.use('/api/estado/', Estado);
app.use('/api/proveedor/', Proveedor);
app.use('/api/documento-compra/', DocumentoCompra);
app.use('/api/compra/', Compra);
app.use('/api/detalle-compra/',DetalleCompra);
app.use('/api/estado-dinero/',EstadoDinero);


//------SUBIR APP--------------
app.listen(process.env.PORT_NODE,()=>{
    console.log("Servidor Node JS "+process.env.PORT_NODE);
});
/*
http.createServer(function (req, res) { 
    res.writeHead(200, {'Content-Type': 'text/plain'}); 
    res.end('Hello World\n'); 
}).listen(8080, "0.0.0.0");
*/