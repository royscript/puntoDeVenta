const router = require('express').Router();
const Permisos = require('../modelo/Permisos');
const RouterRespuestas = require('../utils/RouterRespuestas');
const permisos = new Permisos();

router.post("/listar",(req, res)=>{
    const { body } = req;
    const { idPermiso }= body;
    RouterRespuestas(
                    async ()=> await permisos.listarPermisosDelUsuario(idPermiso),
                    res
                    );
});
router.get("/listar",(req, res)=>{
    RouterRespuestas(
                    async ()=> await permisos.listar(),
                    res
                    );
});
module.exports = router;