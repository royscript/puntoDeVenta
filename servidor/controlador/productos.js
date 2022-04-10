const router = require('express').Router();
const Productos = require('../modelo/Productos');
const RouterRespuestas = require('../utils/RouterRespuestas');
const producto = new Productos();

router.post("/listar",(req, res)=>{
    const { body } = req;
    console.log(req);
    const { pagSiguiente, cantPorPag }= body;
    RouterRespuestas(
                    async ()=> await producto.listar(pagSiguiente, cantPorPag),
                    res
                    );
});
router.put("/insertar",(req, res)=>{
    const { body } = req;
    const { nombreProducto,valorProducto,cantidadProducto,Estado_idEstado,Familia_idFamilia,precioVentaProducto, codigoBarraProducto }= body;
    RouterRespuestas(
                    async ()=> await producto.insertar(nombreProducto,valorProducto,cantidadProducto,Estado_idEstado,Familia_idFamilia,precioVentaProducto,codigoBarraProducto),
                    res
                    );
});
router.put("/editar",(req, res)=>{
    const { body } = req;
    const { nombreProducto,valorProducto,cantidadProducto,Estado_idEstado,Familia_idFamilia,precioVentaProducto,idProducto,codigoBarraProducto }= body;
    RouterRespuestas(
                    async ()=> await producto.editar(nombreProducto,valorProducto,cantidadProducto,Estado_idEstado,Familia_idFamilia,precioVentaProducto,idProducto,codigoBarraProducto),
                    res
                    );
});
module.exports = router;