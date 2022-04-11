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
import formatoDinero from "../funciones/formatoDinero";
import FeatherIcon from 'feather-icons-react';
import { Link, useParams } from "react-router-dom";

const DetalleCompra = ({children, logOut, conseguirPermisos, usuario})=>{
    let { idCompraOrigen } = useParams();//Capturamos el id de la compra
    const [titulo, setTitulo] = useState();
    const [respuestaConsulta, setRespuestaConsulta] = useState();
    const [compras, setCompra] = useState([]);
    const [valoresFormulario, setValoresFormulario] = useState(null);
    const [botonPresionado,setBotonPresionado] = useState(null);
    const [pagSiguiente, setPagSiguiente] = useState(1);
    const [cantPorPag, setCantPorPag] = useState(5);
    const listarCompras = async (search)=>{
        try {
            const resultSet = await axios.post('/compra/listar', {pagSiguiente : pagSiguiente, cantPorPag : cantPorPag, search});
            setCompra(resultSet.data);
        } catch (error) {
            setRespuestaConsulta(
                <div className="alert alert-danger" role="alert">
                    {error}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>);
        }
        
    }
    const eliminarCompra = async (id)=>{
        try {
            const resultSet = await axios.post('/compra/eliminar', {id});
            setRespuestaConsulta(
                <div className="alert alert-danger" role="alert">
                    Producto <b>Eliminado</b> Correscamente
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>);
            listarCompras();
        } catch (error) {
            setRespuestaConsulta(
                <div className="alert alert-danger" role="alert">
                    {error}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>);
        }
        
    }
    const [documento, setDocumento] = useState([]);
    const listarTipoDocumento = async ()=>{
        const resultSet = await axios.get('/documento-compra/listar');
        setDocumento(resultSet.data);
    }
    const buscarTipoDocumento =(DocumentoCompra_idDocumentoCompra) =>{
        if(documento.length==0) return DocumentoCompra_idDocumentoCompra;
        return documento.find((e)=>e.idDocumentoCompra==DocumentoCompra_idDocumentoCompra).nombreDocumentoCompra;
    }
    const [proveedor, setProveedor] = useState([]);
    const listarProveedor = async ()=>{
        const resultSet = await axios.get('/proveedor/listar');
        setProveedor(resultSet.data);
    }
    const buscarProveedor =(Proveedor_idProveedor) =>{
        if(proveedor.length==0) return Proveedor_idProveedor;
        return proveedor.find((e)=>e.idProveedor==Proveedor_idProveedor).razonSocialProveedor;
    }
    useEffect(()=>{
        listarCompras();
    },[pagSiguiente,cantPorPag])
    useEffect(()=>{
        console.log("idCompraOrigen : "+idCompraOrigen);
        setTitulo("Compra / Detalle Compra");
        //conseguirPermisos();
        //console.log(usuario);
        listarProveedor();
        listarTipoDocumento();
        listarCompras();

    },[])
    return(
        <>
        <NavBar usuario={usuario.nombreUsuario+" "+usuario.apellidoUsuario} logOut={logOut}/>

            <div className="container-fluid">
                <div className="row">
                    <SidebarMenu seccion={"compra"}/>
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <HeaderContainer titulo={titulo}/>
                        {children}
                        <Formik
                            initialValues={valoresFormulario || { idCompra: '',  FechaCompra: '',  FechaRegistroCompra: '',  numeroDocumentoCompra: '',  totalCompra: '',  impuestoCompra: '',  Usuario_idUsuario: '',  DocumentoCompra_idDocumentoCompra: '',  Proveedor_idProveedor: ''}}
                            enableReinitialize
                            validate={
                                (values) => {
                                    const errors = {}
                                    if(!values.FechaCompra) {
                                        errors.FechaCompra = 'Requerido'
                                    } else if (values.FechaCompra.length < 4) {
                                        errors.FechaCompra = 'Ingresa la fecha de la compra'
                                    }
                                    if(!values.FechaRegistroCompra) {
                                        errors.FechaRegistroCompra = 'Requerido'
                                    } else if (values.FechaRegistroCompra.length < 5) {
                                        errors.FechaRegistroCompra = 'Ingresa la fecha cuando se hizo la compra'
                                    }
                                    if(!values.numeroDocumentoCompra) {
                                        errors.numeroDocumentoCompra = 'Requerido'
                                    } else if (values.numeroDocumentoCompra.length < 3) {
                                        errors.numeroDocumentoCompra = 'Ingresa el numero de documento de la compra'
                                    }
                                    if(!values.totalCompra) {
                                        errors.totalCompra = 'Requerido'
                                    } else if (values.totalCompra.length < 2) {
                                        errors.totalCompra = 'Ingresa el total de la compra'
                                    }
                                    if(!values.impuestoCompra) {
                                        errors.impuestoCompra = 'Requerido'
                                    } else if (values.impuestoCompra.length < 5) {
                                        errors.impuestoCompra = 'Ingresa el impuesto de la compra'
                                    }
                                    if(!values.DocumentoCompra_idDocumentoCompra) {
                                        errors.DocumentoCompra_idDocumentoCompra = 'Selecciona el tipo de documento'
                                    }
                                    if(!values.Proveedor_idProveedor) {
                                        errors.Proveedor_idProveedor = 'Selecciona el proveedor'
                                    }
                                    return errors
                                }
                            }
                            onChange = {(name, value, { props }) => {
                                props.handleFormChange(name, value); // call some method from parent 
                            }}
                            onSubmit={async (values,{resetForm,submitForm})=>{
                                if(botonPresionado=="Guardar"){
                                    axios.put('/compra/insertar', { FechaRegistroCompra: values.FechaRegistroCompra, numeroDocumentoCompra: values.numeroDocumentoCompra, totalCompra: values.totalCompra, impuestoCompra: values.impuestoCompra, Usuario_idUsuario: usuario.idUsuario, DocumentoCompra_idDocumentoCompra: values.DocumentoCompra_idDocumentoCompra, Proveedor_idProveedor: values.Proveedor_idProveedor})
                                        .then(res => {
                                            if(res.status===200){
                                                resetForm({values: ''});
                                                setValoresFormulario(null);
                                                listarCompras();
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
                                    axios.put('/compra/editar', {  idCompra: values.idCompra, FechaCompra: values.FechaCompra, FechaRegistroCompra: values.FechaRegistroCompra, numeroDocumentoCompra: values.numeroDocumentoCompra, totalCompra: values.totalCompra, impuestoCompra: values.impuestoCompra, Usuario_idUsuario: usuario.idUsuario, DocumentoCompra_idDocumentoCompra: values.DocumentoCompra_idDocumentoCompra, Proveedor_idProveedor: values.Proveedor_idProveedor})
                                    .then(res => {
                                        if(res.status===200){
                                            resetForm({values: ''});
                                            setValoresFormulario(null);
                                            listarCompras();
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
                                                <InputReadOnly name="idCompra" label="Id Compra"/>
                                                <Input name="FechaCompra" label="Fecha" type="date" readOnly/>
                                                <Input name="FechaRegistroCompra" label="Fecha de la compra" type="date"/>
                                                <Input name="numeroDocumentoCompra" label="Numero Documento Compra" type="text"/>
                                                <Input name="totalCompra" label="Total de la Compra" type="number"/>
                                                <Input name="impuestoCompra" label="Impuesto de la Compra" type="number"/>
                                                <Select name="DocumentoCompra_idDocumentoCompra" label="Documento de Compra">
                                                    <option>Seleccione</option>
                                                    {documento.map((value,key)=><option key={key+'-estado'} value={value.idDocumentoCompra}>{value.nombreDocumentoCompra}</option>)}
                                                </Select>
                                                <Select name="Proveedor_idProveedor" label="Proveedor">
                                                    <option>Seleccione</option>
                                                    {proveedor.map((value,key)=><option key={key+'-estado'} value={value.idProveedor}>{value.razonSocialProveedor}</option>)}
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
                                        <th>Fecha Compra</th>
                                        <th>Fecha Registro Compra</th>
                                        <th>Numero Documento Compra</th>
                                        <th>Total Compra</th>
                                        <th>Impuesto Compra</th>
                                        <th>Usuario</th>
                                        <th>Documento Compra</th>
                                        <th>Proveedor</th>
                                        <th>Accion</th>
                                    </tr>
                                }
                                mostrarDatos={
                                    (value,index)=>
                                    <tr key={index+'fila'}>
                                        <td>{value.idCompra}</td>
                                        <td>{value.FechaCompra_formateada}</td>
                                        <td>{value.FechaRegistroCompra_formateada}</td>
                                        <td>{value.numeroDocumentoCompra}</td>
                                        <td>$ {formatoDinero(value.totalCompra)}</td>
                                        <td>$ {formatoDinero(value.impuestoCompra)}</td>
                                        <td>{value.nombreUsuario} {value.apellidoUsuario}</td>
                                        <td>{buscarTipoDocumento(value.DocumentoCompra_idDocumentoCompra)}</td>
                                        <td>{buscarProveedor(value.Proveedor_idProveedor)}</td>
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
                                                        var resp = window.confirm(`Desea eliminar esta Compra ${value.numeroDocumentoCompra}`);
                                                        if(resp) eliminarCompra(value.idCompra);
                                                    }
                                                }>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                                    </svg>
                                                </button>
                                                <Link to="/detalle-compra">
                                                    <FeatherIcon icon="shopping-car" />
                                                    Detalle Compra
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                }
                                data={compras}
                                setCantPorPag={setCantPorPag}
                                setPagSiguiente={setPagSiguiente}
                                funcionDeDatos={listarCompras}
                                placeHolderSearch="Buscar por numero de documento y proveedor"
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
export default DetalleCompra;