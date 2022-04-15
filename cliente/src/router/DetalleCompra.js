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
import SelectSearchA from "../components/formulario/SelectSearch";

const DetalleCompra = ({children, logOut, conseguirPermisos, usuario})=>{
    let { idCompraOrigen } = useParams();//Capturamos el id de la compra
    const [titulo, setTitulo] = useState();
    const [familiaProducto, setFamiliaProducto] = useState([]);
    const [estado, setEstado] = useState([]);
    const [respuestaConsulta, setRespuestaConsulta] = useState();
    const [productos, setProductos] = useState([]);
    const [valoresFormulario, setValoresFormulario] = useState(null);
    const [botonPresionado,setBotonPresionado] = useState(null);
    const [pagSiguiente, setPagSiguiente] = useState(1);
    const [cantPorPag, setCantPorPag] = useState(5);
    const listarDetalleCompra = async (search)=>{
        try {
            const resultSet = await axios.post('/detalle-compra/listar', {pagSiguiente : pagSiguiente, cantPorPag : cantPorPag, search});
            setProductos(resultSet.data);
        } catch (error) {
            setRespuestaConsulta(
                <div className="alert alert-danger" role="alert">
                    {error}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>);
        }
        
    }
    const listarFamiliaProducto = async ()=>{
        const resultSet = await axios.get('/familia-producto/listar');
        setFamiliaProducto(resultSet.data);
    }
    const listarEstado = async ()=>{
        const resultSet = await axios.get('/estado/listar');
        setEstado(resultSet.data);
    }
    const eliminarProducto = async (id)=>{
        try {
            const resultSet = await axios.post('/detalle-compra/eliminar', {id});
            setRespuestaConsulta(
                <div className="alert alert-danger" role="alert">
                    Producto <b>Eliminado</b> Correscamente
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>);
            listarDetalleCompra();
        } catch (error) {
            setRespuestaConsulta(
                <div className="alert alert-danger" role="alert">
                    {error}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>);
        }
        
    }
    const buscarEstado =(idEstado) =>{
        if(estado.length==0) return idEstado;
        return estado.find((e)=>e.idEstado==idEstado).nombreEstado;
    }
    const buscarProducto = async (codigo)=>{
        try {
            const resultSet = await axios.post('/productos/buscar', {codigo});
            return resultSet.data;            
        } catch (error) {
            return false;
        }
    }
    const actualizarStocks = ()=>{
        axios.put('/detalle-compra/actualizar-stocks', { Compra_idCompra : idCompraOrigen })
            .then(res => {
                if(res.status===200){
                    listarDetalleCompra("");
                    setRespuestaConsulta(
                        <div className="alert alert-success" role="alert">
                            Stock Actualizado
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
    }
    useEffect(()=>{
        listarDetalleCompra();
    },[pagSiguiente,cantPorPag])
    useEffect(()=>{
        setTitulo("Detalle Compra");
        //conseguirPermisos();
        //console.log(usuario);
        listarDetalleCompra();
        listarEstado();
        listarFamiliaProducto();

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
                            initialValues={valoresFormulario || {idDetalleCompra : idCompraOrigen, Compra_idCompra : '', idProducto : '', nombreProducto : '', valorProducto : '', cantidad : '', Estado_idEstado : '', Familia_idFamilia : '', precioVentaProducto : '', codigoBarraProducto : ''}}
                            enableReinitialize
                            validate={
                                async (values) => {
                                    const errors = {}
                                    if(!values.nombreProducto) {
                                        errors.nombreProducto = 'Requerido'
                                    } else if (values.nombreProducto.length < 5) {
                                        errors.nombreProducto = 'Ingresa el Nombre del Producto'
                                    }
                                    if(!values.valorProducto) {
                                        errors.valorProducto = 'Requerido'
                                    } else if (values.valorProducto.length < 2) {
                                        errors.valorProducto = 'Ingresa el valor del producto'
                                    }
                                    if(!values.cantidad) {
                                        errors.cantidad = 'Requerido'
                                    } else if (values.cantidad.length < 1) {
                                        errors.cantidad = 'Ingresa la cantidad de productos'
                                    }
                                    if(!values.precioVentaProducto) {
                                        errors.precioVentaProducto = 'Requerido'
                                    } else if (values.precioVentaProducto.length < 1) {
                                        errors.precioVentaProducto = 'Ingresa el precio de venta'
                                    }
                                    if(!values.Estado_idEstado) {
                                        errors.Estado_idEstado = 'Requerido'
                                    }
                                    if(!values.Familia_idFamilia){
                                        errors.Familia_idFamilia = 'Requerido'
                                    }
                                    
                                    if(!values.codigoBarraProducto){
                                        errors.codigoBarraProducto = 'Requerido'
                                    }else if(values.codigoBarraProducto.length<1){
                                        errors.codigoBarraProducto = 'Ingrese el codigo de barras';
                                    }else{
                                        /*const consultarProducto = await buscarProducto(values.codigoBarraProducto);
                                        if(!consultarProducto){
                                            //console.log(!consultarProducto);
                                        }else{//Si hay producto
                                            //console.log(consultarProducto[0]);
                                            setValoresFormulario(consultarProducto[0]);
                                        }*/
                                        
                                    }
                                    console.log(values);
                                    console.log(errors);
                                    return errors
                                }
                            }
                            onChange = {(name, value, { props }) => {
                                props.handleFormChange(name, value); // call some method from parent 
                            }}
                            onSubmit={async (values,{resetForm,submitForm})=>{
                                if(botonPresionado==="Guardar"){
                                    axios.put('/detalle-compra/insertar', { nombreProducto : values.nombreProducto, 
                                                                        valorProducto : values.valorProducto, 
                                                                        cantidad : values.cantidad, 
                                                                        Estado_idEstado : values.Estado_idEstado,
                                                                        Familia_idFamilia : values.Familia_idFamilia,
                                                                        precioVentaProducto : values.precioVentaProducto,
                                                                        codigoBarraProducto : values.codigoBarraProducto,
                                                                        Compra_idCompra : idCompraOrigen })
                                        .then(res => {
                                            if(res.status===200){
                                                resetForm({values: ''});
                                                setValoresFormulario(null);
                                                listarDetalleCompra();
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
                                }else if(botonPresionado==='Editar'){
                                    axios.put('/detalle-compra/editar', { nombreProducto : values.nombreProducto, 
                                        valorProducto : values.valorProducto, 
                                        cantidad : values.cantidad, 
                                        Estado_idEstado : values.Estado_idEstado,
                                        Familia_idFamilia : values.Familia_idFamilia,
                                        precioVentaProducto : values.precioVentaProducto,
                                        codigoBarraProducto : values.codigoBarraProducto,
                                        idProducto : values.idProducto,
                                        Compra_idCompra : idCompraOrigen })
                                    .then(res => {
                                        if(res.status===200){
                                            resetForm({values: ''});
                                            setValoresFormulario(null);
                                            listarDetalleCompra();
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
                            {({ setFieldValue }) => (
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
                                                <InputReadOnly name="idProducto" label="Id Producto"/>
                                                <Input name="codigoBarraProducto" label="Codigo de Barras Producto" type="text" 
                                                    onChange={ async (e, value) => {
                                                        setFieldValue("codigoBarraProducto", e.target.value);
                                                        const consultarProducto = await buscarProducto(e.target.value);
                                                        if(consultarProducto.length>0){
                                                            setFieldValue("idProducto", consultarProducto[0].idProducto);
                                                            setFieldValue("nombreProducto", consultarProducto[0].nombreProducto);
                                                            setFieldValue("valorProducto", consultarProducto[0].valorProducto);
                                                            setFieldValue("precioVentaProducto", consultarProducto[0].precioVentaProducto);
                                                            setFieldValue("Estado_idEstado", consultarProducto[0].Estado_idEstado);
                                                            setFieldValue("Familia_idFamilia", consultarProducto[0].Familia_idFamilia);
                                                        }
                                                    }}/>
                                                <Input name="nombreProducto" label="Nombre del producto" type="text"/>
                                                <Input name="valorProducto" label="¿Cuánto le costo el producto?" type="number"/>
                                                <Input name="precioVentaProducto" label="¿A Cuánto lo venderá?" type="number"/>
                                                <Input name="cantidad" label="Cantidad del producto" type="number"/>
                                                <Select name="Estado_idEstado" label="Estado del Producto">
                                                    <option>Seleccione</option>
                                                    {estado.map((value,key)=><option key={key+'-estado'} value={value.idEstado}>{value.nombreEstado}</option>)}
                                                </Select>
                                                
                                                <Select name="Familia_idFamilia" label="Familia del Producto">
                                                    <option>Seleccione</option>
                                                    {familiaProducto.map((value,key)=><option key={key+'-familiaProducto'} value={value.idFamilia}>{value.nombreFamilia}</option>)}
                                                </Select>
                                            </div>
                                            <div className="card-footer">
                                                <div className="row">
                                                    <div className="form-group">
                                                        <div className="input-group">
                                                            <Boton label={"Guardar"} type={"Submit"} className="btn btn-success" onClick={()=>setBotonPresionado("Guardar")}/>
                                                            <button type="button" className="btn btn-danger"
                                                            onClick={()=>{
                                                                actualizarStocks();
                                                            }}>Actualizar Stocks</button>
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
                                        <th>Codigo</th>
                                        <th>Producto</th>
                                        <th>Valor</th>
                                        <th>Cantidad</th>
                                        <th>Stock</th>
                                        <th>Precio Venta</th>
                                        <th>Estado</th>
                                        <th>Accion</th>
                                    </tr>
                                }
                                mostrarDatos={
                                    (value,index)=>
                                    <tr key={index+'fila'}>
                                        <td>{value.codigoBarraProducto}</td>
                                        <td>{value.nombreProducto}</td>
                                        <td>$ {formatoDinero(value.valorDetalleCompra)}</td>
                                        <td>{formatoDinero(value.cantidadDetalleCompra)}</td>
                                        <td>{formatoDinero(value.cantidadProducto)}</td>
                                        <td>$ {formatoDinero(value.precioVentaProducto)}</td>
                                        <td>
                                            <span className={value.Estado_idEstado==1?"badge bg-success":"badge bg-danger"}>
                                                {buscarEstado(value.Estado_idEstado)}
                                            </span>
                                        </td>
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
                                                        var resp = window.confirm(`Desea eliminar este producto? ${value.nombreProducto}`);
                                                        if(resp) eliminarProducto(value.idProducto);
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
                                data={productos}
                                setCantPorPag={setCantPorPag}
                                setPagSiguiente={setPagSiguiente}
                                funcionDeDatos={listarDetalleCompra}
                                placeHolderSearch="Buscar por Codigo de Barra y nombres de productos"
                            />
                            </Form>
                            )}
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