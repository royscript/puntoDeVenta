const router = require('express').Router();
const Productos = require('../modelo/Productos');
const RouterRespuestas = require('../utils/RouterRespuestas');
const producto = new Productos();

router.post("/listar",(req, res)=>{
    const { body } = req;
    const { pagSiguiente, cantPorPag, search }= body;
    RouterRespuestas(
                    async ()=> await producto.listar(pagSiguiente, cantPorPag, search),
                    res
                    );
});
router.post("/buscar",(req, res)=>{
    const { body } = req;
    const { codigo }= body;
    console.log(codigo);
    RouterRespuestas(
                    async ()=> await producto.buscar(codigo),
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
router.post("/eliminar",(req, res)=>{
    const { body } = req;
    const { id }= body;
    RouterRespuestas(
                    async ()=> await producto.eliminar(id),
                    res
                    );
});
module.exports = router;