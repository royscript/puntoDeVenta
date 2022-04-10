import { useEffect, useState } from "react";
import HeaderContainer from "./navegacion/HeaderContainer";
import NavBar from "./navegacion/Navbar";
import SidebarMenu from "./navegacion/SideBarMenu";
import axios from "../api/axios";
import { Formik, Form, useFormikContext } from "formik";
import Input from "../components/formulario/Input";
import Boton from "../components/formulario/Boton";
import Select from "../components/formulario/Select";
import TablePagination from "../components/tablas/TablePagination";
import InputReadOnly from "../components/formulario/InputReadOnly";

const Productos = ({children, logOut, conseguirPermisos, usuario})=>{
    const [titulo, setTitulo] = useState();
    const [familiaProducto, setFamiliaProducto] = useState([]);
    const [estado, setEstado] = useState([]);
    const [respuestaConsulta, setRespuestaConsulta] = useState();
    const [productos, setProductos] = useState([]);
    const [valoresFormulario, setValoresFormulario] = useState(null);
    const [botonPresionado,setBotonPresionado] = useState(null);
    const listarFamiliaProducto = async ()=>{
        const resultSet = await axios.get('/familia-producto/listar');
        setFamiliaProducto(resultSet.data);
    }
    const listarEstado = async ()=>{
        const resultSet = await axios.get('/estado/listar');
        setEstado(resultSet.data);
    }
    const [pagSiguiente, setPagSiguiente] = useState(1);
    const [cantPorPag, setCantPorPag] = useState(5);
    const listarProductos = async ()=>{
        const resultSet = await axios.post('/productos/listar', {pagSiguiente : pagSiguiente, cantPorPag : cantPorPag});
        setProductos(resultSet.data);
    }
    const eliminarProducto = async (id)=>{
        const resultSet = await axios.delete('/productos/eliminar', {id});
        setRespuestaConsulta(
            <div className="alert alert-danger" role="alert">
                Producto <b>Eliminado</b> Correscamente
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>);
        listarProductos();
    }
    useEffect(()=>{
        listarProductos();
    },[pagSiguiente,cantPorPag])
    useEffect(()=>{
        setTitulo("Productos");
        //conseguirPermisos();
        //console.log(usuario);
        listarProductos();
        listarEstado();
        listarFamiliaProducto();
    },[])
    return(
        <>
        <NavBar usuario={"Roy Standen"} logOut={logOut}/>

            <div className="container-fluid">
                <div className="row">
                    <SidebarMenu/>
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <HeaderContainer titulo={titulo}/>
                        {children}
                        <Formik
                            initialValues={valoresFormulario || {idProducto : '', nombreProducto : '', valorProducto : '', cantidadProducto : '', Estado_idEstado : '', Familia_idFamilia : '', precioVentaProducto : '', codigoBarraProducto : ''}}
                            enableReinitialize
                            validate={
                                (values) => {
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
                                    if(!values.cantidadProducto) {
                                        errors.cantidadProducto = 'Requerido'
                                    } else if (values.cantidadProducto.length < 1) {
                                        errors.cantidadProducto = 'Ingresa la cantidad de productos'
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
                                    }
                                    return errors
                                }
                            }
                            onChange = {(name, value, { props }) => {
                                props.handleFormChange(name, value); // call some method from parent 
                            }}
                            onSubmit={async (values,{resetForm,submitForm})=>{
                                console.log(submitForm);
                                if(botonPresionado=="Guardar"){
                                    axios.put('/productos/insertar', { nombreProducto : values.nombreProducto, 
                                                                        valorProducto : values.valorProducto, 
                                                                        cantidadProducto : values.cantidadProducto, 
                                                                        Estado_idEstado : values.Estado_idEstado,
                                                                        Familia_idFamilia : values.Familia_idFamilia,
                                                                        precioVentaProducto : values.precioVentaProducto,
                                                                        codigoBarraProducto : values.codigoBarraProducto, })
                                        .then(res => {
                                            if(res.status===200){
                                                resetForm({values: ''});
                                                setValoresFormulario(null);
                                                listarProductos();
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
                                    axios.put('/productos/editar', { nombreProducto : values.nombreProducto, 
                                        valorProducto : values.valorProducto, 
                                        cantidadProducto : values.cantidadProducto, 
                                        Estado_idEstado : values.Estado_idEstado,
                                        Familia_idFamilia : values.Familia_idFamilia,
                                        precioVentaProducto : values.precioVentaProducto,
                                        codigoBarraProducto : values.codigoBarraProducto,
                                        idProducto : values.idProducto })
                                    .then(res => {
                                        if(res.status===200){
                                            resetForm({values: ''});
                                            setValoresFormulario(null);
                                            listarProductos();
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
                                <div className="card" style={{"width": "100%"}}>
                                    <div className="card-body">
                                        <InputReadOnly name="idProducto" label="Id Producto"/>
                                        <Input name="codigoBarraProducto" label="Codigo de Barras Producto" type="text"/>
                                        <Input name="nombreProducto" label="Nombre del producto" type="text"/>
                                        <Input name="valorProducto" label="Valor del producto" type="number"/>
                                        <Input name="cantidadProducto" label="Cantidad del producto" type="number"/>
                                        <Input name="precioVentaProducto" label="Precio de venta del producto" type="number"/>
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
                                                    <Boton label={"Guardar"} type={"Submit"} onClick={()=>setBotonPresionado("Guardar")}/>
                                                    <Boton label={"Editar"} type={"Submit"} onClick={()=>setBotonPresionado("Editar")}/>
                                                    <Boton label={"Cargar"} type={"button"} onClick={()=>listarProductos()}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            {respuestaConsulta}
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
                                        <td>{value.valorProducto}</td>
                                        <td>{value.cantidadProducto}</td>
                                        <td>{value.precioVentaProducto}</td>
                                        <td>{value.Estado_idEstado}</td>
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
                                funcionDeDatos={()=>listarProductos()}
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
export default Productos;