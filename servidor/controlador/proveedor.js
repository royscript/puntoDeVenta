const router = require('express').Router();
const Proveedor = require('../modelo/Proveedor');
const RouterRespuestas = require('../utils/RouterRespuestas');
const proveedor = new Proveedor();

router.get("/listar",(req, res)=>{
    RouterRespuestas(
                    async ()=> await proveedor.listar(),
                    res
                    );
});

router.post("/listar",(req, res)=>{
    const { body } = req;
    const { pagSiguiente, cantPorPag, search }= body;
    RouterRespuestas(
                    async ()=> await proveedor.listarConFiltro(pagSiguiente, cantPorPag, search),
                    res
                    );
});
router.put("/insertar",(req, res)=>{
    const { body } = req;
    const { razonSocialProveedor, contactoProveedor,direccionProveedor, telefonoProveedor,rutProveedor }= body;
    RouterRespuestas(
                    async ()=> await proveedor.insertar(razonSocialProveedor, contactoProveedor,direccionProveedor, telefonoProveedor,rutProveedor),
                    res
                    );
});
router.put("/editar",(req, res)=>{
    const { body } = req;
    const { razonSocialProveedor, contactoProveedor,direccionProveedor, telefonoProveedor,rutProveedor,idProveedor }= body;
    RouterRespuestas(
                    async ()=> await proveedor.editar(razonSocialProveedor, contactoProveedor,direccionProveedor, telefonoProveedor,rutProveedor,idProveedor),
                    res
                    );
});
router.post("/eliminar",(req, res)=>{
    const { body } = req;
    const { id }= body;
    RouterRespuestas(
                    async ()=> await proveedor.eliminar(id),
                    res
                    );
});
module.exports = router;