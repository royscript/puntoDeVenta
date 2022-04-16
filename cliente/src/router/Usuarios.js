import { useEffect, useState } from "react";
import HeaderContainer from "./navegacion/HeaderContainer";
import NavBar from "./navegacion/Navbar";
import SidebarMenu from "./navegacion/SideBarMenu";
import axios from "../api/axios";
import { Formik, Form } from "formik";
import Input from "../components/formulario/Input";
import Boton from "../components/formulario/Boton";
import Select from "../components/formulario/Select";
import TablePagination from "../components/tablas/TablePagination";
import InputReadOnly from "../components/formulario/InputReadOnly";

const Usuarios = ({children, logOut, conseguirPermisos, usuario})=>{
    const [titulo, setTitulo] = useState();
    const [respuestaConsulta, setRespuestaConsulta] = useState();
    const [usuarios, setUsuarios] = useState([]);
    const [valoresFormulario, setValoresFormulario] = useState(null);
    const [botonPresionado,setBotonPresionado] = useState(null);
    const [pagSiguiente, setPagSiguiente] = useState(1);
    const [cantPorPag, setCantPorPag] = useState(5);
    const [permisos, setPermisos] = useState([]);
    const buscarUsuario = async (rutUsuario)=>{
        try {
            return await axios.post('/usuario/buscar-usuario', {rutUsuario});
        } catch (error) {
            return null;
        }
        
    }
    const listarUsuarios = async (search)=>{
        try {
            const resultSet = await axios.post('/usuario/listar', {pagSiguiente : pagSiguiente, cantPorPag : cantPorPag, search});
            setUsuarios(resultSet.data);
        } catch (error) {
            setRespuestaConsulta(
                <div className="alert alert-danger" role="alert">
                    {error}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>);
        }
        
    }
    const eliminarUsuario = async (id)=>{
        try {
            const resultSet = await axios.post('/usuario/eliminar', {id});
            setRespuestaConsulta(
                <div className="alert alert-danger" role="alert">
                    Producto <b>Eliminado</b> Correscamente
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>);
            listarUsuarios();
        } catch (error) {
            setRespuestaConsulta(
                <div className="alert alert-danger" role="alert">
                    {error}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>);
        }
        
    }
    const listarPermiso = async ()=>{
        const resultSet = await axios.get('/permisos/listar');
        setPermisos(resultSet.data);
    }
    const buscarPermiso =(idPermiso) =>{
        if(permisos.length==0) return idPermiso;
        return permisos.find((e)=>e.idPermiso==idPermiso).nombrePermiso;
    }
    useEffect(()=>{
        listarUsuarios();
    },[pagSiguiente,cantPorPag])
    useEffect(()=>{
        setBotonPresionado("Guardar");
        setTitulo("Usuarios");
        listarPermiso();
        listarUsuarios();

    },[])
    return(
        <>
        <NavBar usuario={usuario.nombreUsuario+" "+usuario.apellidoUsuario} logOut={logOut}/>

            <div className="container-fluid">
                <div className="row">
                    <SidebarMenu seccion={"usuarios"}/>
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <HeaderContainer titulo={titulo}/>
                        <Formik
                            initialValues={valoresFormulario || {idUsuario : '', nombreUsuario: '' , apellidoUsuario: '' , emailUsuario: '' , rutUsuario: '' , contrasenaUsuario: '' , direccionUsuario: '' , telefonoUsuario: '' , Permiso_idPermiso: ''}}
                            enableReinitialize
                            validate={
                                async (values) => {
                                    const errors = {}
                                    if(!values.nombreUsuario) {
                                        errors.nombreUsuario = 'Requerido'
                                    } else if (values.nombreUsuario.length < 5) {
                                        errors.nombreUsuario = 'Ingresa el Nombre de Usuario'
                                    }
                                    if(!values.apellidoUsuario) {
                                        errors.apellidoUsuario = 'Requerido'
                                    } else if (values.apellidoUsuario.length < 5) {
                                        errors.apellidoUsuario = 'Ingresa los apellidos del usuario '
                                    }
                                    if(!values.emailUsuario) {
                                        errors.emailUsuario = 'Requerido'
                                    } else if (values.emailUsuario.length < 5) {
                                        errors.emailUsuario = 'Ingresa el email del usuario'
                                    }
                                    if(!values.rutUsuario) {
                                        errors.rutUsuario = 'Requerido'
                                    } else if (values.rutUsuario.length < 5) {
                                        errors.rutUsuario = 'Ingresa el rut del usuario'
                                    } else {
                                        const resp = await buscarUsuario(values.rutUsuario);
                                        //La unica forma de saber si estamos en modificar es mediante el idUsuario
                                        //Si existe el idUsuario es porque es modificar, en caso contrario es agregar
                                        if(values.idUsuario===null || values.idUsuario===''){
                                            if(resp.data.length>0){
                                                errors.rutUsuario = 'El rut ingresado corresponde a otro usuario';
                                            }
                                        }else{
                                            const usuarioEncontrado = resp.data[0];
                                            if(resp.data.length>0){
                                                //Si el rut lo esta usando otra persona con un id diferente al del que estamos modificando
                                                if(usuarioEncontrado.rutUsuario===values.rutUsuario && values.idUsuario!=usuarioEncontrado.idUsuario){
                                                    errors.rutUsuario = 'El rut ingresado corresponde a otro usuario';
                                                }
                                            }
                                        }
                                    }
                                    if(!values.contrasenaUsuario) {
                                        errors.contrasenaUsuario = 'Requerido'
                                    } else if (values.contrasenaUsuario.length < 5) {
                                        errors.contrasenaUsuario = 'Ingresa la contraseña del usuario '
                                    }
                                    if(!values.direccionUsuario) {
                                        errors.direccionUsuario = 'Requerido'
                                    } else if (values.direccionUsuario.length < 5) {
                                        errors.direccionUsuario = 'Ingresa la direccion del usuario '
                                    }
                                    if(!values.telefonoUsuario) {
                                        errors.telefonoUsuario = 'Requerido'
                                    } else if (values.telefonoUsuario.length < 5) {
                                        errors.telefonoUsuario = 'Ingresa el telefono del usuario'
                                    }
                                    if(!values.Permiso_idPermiso) {
                                        errors.Permiso_idPermiso = 'Requerido'
                                    }
                                    return errors
                                }
                            }
                            onChange = {(name, value, { props }) => {
                                props.handleFormChange(name, value); // call some method from parent 
                            }}
                            onSubmit={async (values,{resetForm,submitForm})=>{
                                if(botonPresionado==="Guardar"){
                                    axios.put('/usuario/insertar', { nombreUsuario: values.nombreUsuario , apellidoUsuario: values.apellidoUsuario , emailUsuario: values.emailUsuario , rutUsuario: values.rutUsuario , contrasenaUsuario: values.contrasenaUsuario , direccionUsuario: values.direccionUsuario , telefonoUsuario: values.telefonoUsuario , Permiso_idPermiso: values.Permiso_idPermiso })
                                        .then(res => {
                                            if(res.status===200){
                                                resetForm({values: ''});
                                                setValoresFormulario(null);
                                                listarUsuarios();
                                                setRespuestaConsulta(
                                                    <div className="alert alert-success" role="alert">
                                                        Datos Ingresados Correctamente
                                                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                    </div>);
                                            }
                                    }, error =>{
                                        if (error.response.status === 401) {
                                            setRespuestaConsulta(
                                                <div className="alert alert-danger" role="alert">
                                                    Error : {error}
                                                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                </div>);
                                        }
                                    }) 
                                }else{
                                    axios.put('/usuario/editar', { idUsuario : values.idUsuario, nombreUsuario: values.nombreUsuario , apellidoUsuario: values.apellidoUsuario , emailUsuario: values.emailUsuario , rutUsuario: values.rutUsuario , contrasenaUsuario: values.contrasenaUsuario , direccionUsuario: values.direccionUsuario , telefonoUsuario: values.telefonoUsuario , Permiso_idPermiso: values.Permiso_idPermiso })
                                    .then(res => {
                                        if(res.status===200){
                                            resetForm({values: ''});
                                            setValoresFormulario(null);
                                            listarUsuarios();
                                            setRespuestaConsulta(
                                                <div className="alert alert-warning" role="alert">
                                                    Datos <b>modificados</b> Correctamente
                                                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                </div>);
                                        }
                                }, error =>{
                                    if (error.response.status === 401) {
                                        setRespuestaConsulta(
                                            <div className="alert alert-danger" role="alert">
                                                Error : {error}
                                            </div>);
                                    }
                                }) 
                                }
                                               
                            }}
                        >
                            <Form>
                            <div className="accordion" id="accordionExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingOne">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        Formulario
                                    </button>
                                    </h2>
                                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <div className="card" style={{"width": "100%"}}>
                                            <div className="card-body">
                                                <InputReadOnly name="idUsuario" label="Id del Usuario"/>
                                                <Input name="nombreUsuario" label="Nombres del Usuario" type="text"/>
                                                <Input name="apellidoUsuario" label="Apellidos del Usuario" type="text"/>
                                                <Input name="emailUsuario" label="E-mail del Usuario" type="text"/>
                                                <Input name="rutUsuario" label="Rut del Usuario" type="text"/>
                                                <Input name="contrasenaUsuario" label="Contraseña del Usuario" type="text"/>
                                                <Input name="direccionUsuario" label="Direccion del Usuario" type="text"/>
                                                <Input name="telefonoUsuario" label="Telefono del Usuario" type="text"/>
                                                <Select name="Permiso_idPermiso" label="Permiso del Usuario">
                                                    <option>Seleccione</option>
                                                    {permisos.map((value,key)=><option key={key+'-permiso-del-usuario'} value={value.idPermiso}>{value.nombrePermiso}</option>)}
                                                </Select>
                                            </div>
                                            <div className="card-footer">
                                                <div className="row">
                                                    <div className="form-group">
                                                        <div className="input-group">
                                                            <Boton label={"Guardar"} type={"Submit"} className="btn btn-success" onClick={()=>setBotonPresionado("Guardar")}/>
                                                            <Boton label={"Editar"} type={"Submit"} className="btn btn-warning" onClick={()=>setBotonPresionado("Editar")}/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    {respuestaConsulta}
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                <TablePagination
                                head={
                                    <tr>
                                        <th>#</th>
                                        <th>Nombres</th>
                                        <th>Email</th>
                                        <th>Rut</th>
                                        <th>Contraseña</th>
                                        <th>Direccion</th>
                                        <th>Telefono</th>
                                        <th>Permiso</th>
                                        <th>Accion</th>
                                    </tr>
                                }
                                mostrarDatos={
                                    (value,index)=>
                                    <tr key={index+'fila'}>
                                        <td>{value.idUsuario}</td>
                                        <td>{value.nombreUsuario+" "+value.apellidoUsuario}</td>
                                        <td>{value.emailUsuario}</td>
                                        <td>{value.rutUsuario}</td>
                                        <td>{value.contrasenaUsuario}</td>
                                        <td>{value.direccionUsuario}</td>
                                        <td>{value.telefonoUsuario}</td>
                                        <td>{buscarPermiso(value.Permiso_idPermiso)}</td>
                                        <td>
                                            <div className="btn-group" role="group">
                                                <button type="button" className="btn btn-warning" onClick={
                                                    ()=>{
                                                        setValoresFormulario(value);
                                                    }
                                                }>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                                    </svg>
                                                </button>
                                                <button type="button" className="btn btn-danger" onClick={
                                                    ()=>{
                                                        var resp = window.confirm(`Desea eliminar este usuario? ${value.nombreUsuario}`);
                                                        if(resp) eliminarUsuario(value.idUsuario);
                                                    }
                                                }>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                }
                                data={usuarios}
                                setCantPorPag={setCantPorPag}
                                setPagSiguiente={setPagSiguiente}
                                funcionDeDatos={listarUsuarios}
                                placeHolderSearch="Buscar por nombres, apellidos o rut del usuario"
                            />
                            </Form>
                        </Formik>
                        <div>
                            
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}
export default Usuarios;