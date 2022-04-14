import { useEffect, useState } from "react";
import HeaderContainer from "./navegacion/HeaderContainer";
import NavBar from "./navegacion/Navbar";
import SidebarMenu from "./navegacion/SideBarMenu";
import axios from "../api/axios";
import { Formik, Form } from "formik";
import Input from "../components/formulario/Input";
import Boton from "../components/formulario/Boton";
import TablePagination from "../components/tablas/TablePagination";
import InputReadOnly from "../components/formulario/InputReadOnly";

const MedioDePago = ({children, logOut, conseguirPermisos, usuario})=>{
    const [titulo, setTitulo] = useState();
    const [respuestaConsulta, setRespuestaConsulta] = useState();
    const [medioDePago, setMedioDePago] = useState([]);
    const [valoresFormulario, setValoresFormulario] = useState(null);
    const [botonPresionado,setBotonPresionado] = useState(null);
    const [pagSiguiente, setPagSiguiente] = useState(1);
    const [cantPorPag, setCantPorPag] = useState(5);
    const listarMedioDePago = async (search)=>{
        try {
            const resultSet = await axios.post('/medio-de-pago/listar', {pagSiguiente : pagSiguiente, cantPorPag : cantPorPag, search});
            setMedioDePago(resultSet.data);
        } catch (error) {
            setRespuestaConsulta(
                <div className="alert alert-danger" role="alert">
                    {error}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>);
        }
        
    }
    const eliminarDocumentoVenta = async (id)=>{
        try {
            const resultSet = await axios.post('/medio-de-pago/eliminar', {id});
            setRespuestaConsulta(
                <div className="alert alert-danger" role="alert">
                    Producto <b>Eliminado</b> Correscamente
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>);
            listarMedioDePago();
        } catch (error) {
            setRespuestaConsulta(
                <div className="alert alert-danger" role="alert">
                    {error}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>);
        }
        
    }
    useEffect(()=>{
        listarMedioDePago();
    },[pagSiguiente,cantPorPag])
    useEffect(()=>{
        setTitulo("Medio de Pago");
        //conseguirPermisos();
        //console.log(usuario);
        listarMedioDePago();
    },[])
    return(
        <>
        <NavBar usuario={usuario.nombreUsuario+" "+usuario.apellidoUsuario} logOut={logOut}/>
            <div className="container-fluid">
                <div className="row">
                    <SidebarMenu seccion={"medio-de-pago"}/>
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <HeaderContainer titulo={titulo}/>
                        {children}
                        <Formik
                            initialValues={valoresFormulario || {idMedioPago : '', nombreMedioPago : ''}}
                            enableReinitialize
                            validate={
                                (values) => {
                                    const errors = {}
                                    if(!values.nombreMedioPago) {
                                        errors.nombreMedioPago = 'Requerido'
                                    } else if (values.nombreMedioPago.length < 5) {
                                        errors.nombreMedioPago = 'Ingresa el Nombre del Medio de Pago'
                                    }
                                    return errors
                                }
                            }
                            onChange = {(name, value, { props }) => {
                                props.handleFormChange(name, value); // call some method from parent 
                            }}
                            onSubmit={async (values,{resetForm,submitForm})=>{
                                if(botonPresionado==="Guardar"){
                                    axios.put('/medio-de-pago/insertar', { nombreMedioPago : values.nombreMedioPago })
                                        .then(res => {
                                            if(res.status===200){
                                                resetForm({values: ''});
                                                setValoresFormulario(null);
                                                listarMedioDePago();
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
                                    axios.put('/medio-de-pago/editar', { nombreMedioPago : values.nombreMedioPago,
                                        idMedioPago : values.idMedioPago })
                                    .then(res => {
                                        if(res.status===200){
                                            resetForm({values: ''});
                                            setValoresFormulario(null);
                                            listarMedioDePago();
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
                                                <InputReadOnly name="idMedioPago" label="Id Medio de Pago"/>
                                                <Input name="nombreMedioPago" label="Nombre Medio de Pago" type="text"/>
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
                                        <th>Nombre Medio de Pago</th>
                                        <th>Accion</th>
                                    </tr>
                                }
                                mostrarDatos={
                                    (value,index)=>
                                    <tr key={index+'fila'}>
                                        <td>{value.idMedioPago}</td>
                                        <td>{value.nombreMedioPago}</td>
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
                                                        var resp = window.confirm(`Desea eliminar esta familia? ${value.nombreMedioPago}`);
                                                        if(resp) eliminarDocumentoVenta(value.idMedioPago);
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
                                data={medioDePago}
                                setCantPorPag={setCantPorPag}
                                setPagSiguiente={setPagSiguiente}
                                funcionDeDatos={listarMedioDePago}
                                placeHolderSearch="Buscar por nombre de tipo de venta"
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
export default MedioDePago;