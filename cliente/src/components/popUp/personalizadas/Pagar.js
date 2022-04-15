import { useEffect, useState } from "react";
import axios from "../../../api/axios";
import Input from "../../formulario/Input";
import InputReadOnly from "../../formulario/InputReadOnly";
import Select from "../../formulario/Select";
import Boton from "../../formulario/Boton";
import { Formik, Form } from "formik";
import ticketVenta from "../../impresiones/ticketVenta";

const Pagar = ({cerrar,funcionAdicionalSet, detalleVenta, cliente, usuario})=>{
    const [estadoBoton, setEstadoBoton] = useState();
    const [valoresFormulario, setValoresFormulario] = useState(null);
    const [respuestaConsulta, setRespuestaConsulta] = useState();
    const [tipoVenta, setTipoVenta] = useState([]);
    const [documentoDeVenta, setDocumentoDeVenta] = useState([]);
    const [medioDePago, setMedioDePago] = useState([]);
    const [total, setTotal] = useState(0);
    useEffect(()=>{
        var acumulador = 0;
        detalleVenta.forEach((producto)=>{
            acumulador += (parseInt(producto.cantidad) * parseInt(producto.precioVentaProducto));
        })
        setTotal(Math.round(parseInt(acumulador) * 1.19));
    },[detalleVenta])
    const buscarUsuario = async (Cajero_idUsuario1)=>{
        try {
            return await axios.post('/venta/buscar-usuario', {Cajero_idUsuario1});
        } catch (error) {
            return null;
        }
        
    }
    const listarTipoVenta = async ()=>{
        const resultSet = await axios.get('/tipo-venta/listar');
        setTipoVenta(resultSet.data);
    }
    const listarDocumentoDeVenta = async ()=>{
        const resultSet = await axios.get('/documento-de-venta/listar');
        setDocumentoDeVenta(resultSet.data);
    }
    const listarMedioDePago = async ()=>{
        const resultSet = await axios.get('/medio-de-pago/listar');
        setMedioDePago(resultSet.data);
    }

    const mostrarBoleta = (idVenta,fechaVenta)=>{
        var tab = window.open('about:blank', '_blank');
        tab.document.write(ticketVenta(detalleVenta,idVenta,fechaVenta)); // where 'html' is a variable containing your HTML
        tab.document.close(); // to finish loading the page
    }
    useEffect(()=>{
        setEstadoBoton("Agregar");
        setValoresFormulario(null);
        listarTipoVenta();
        listarDocumentoDeVenta();
        listarMedioDePago();
    },[])
    return(
        <>
            <div className="card" style={{"width": "700px","height": "460px"}}>
                <div className="card-body">
                    <div className="row">
                        <div className="btn-group" role="group" style={{"display":"block"}}>
                        <Formik
                            initialValues={valoresFormulario || {idVenta : '', fechaVenta: '' , totalVenta: total , Cliente_idUsuario: cliente.idUsuario , Cajero_idUsuario1: usuario.idUsuario , TipoVenta_idTipoVenta: '' , documentodeventa_idDocumentoDeVenta: '', mediopago_idMedioPago : ''}}
                            enableReinitialize
                            validate={
                                async (values) => {
                                    const errors = {}
                                    
                                    
                                    if(!values.Cajero_idUsuario1) {
                                        errors.Cajero_idUsuario1 = 'Requerido'
                                    } else if (values.Cajero_idUsuario1.length < 5) {
                                        errors.Cajero_idUsuario1 = 'No hay cajero'
                                    }
                                    if(!values.TipoVenta_idTipoVenta) {
                                        errors.TipoVenta_idTipoVenta = 'Requerido'
                                    }
                                    if(!values.documentodeventa_idDocumentoDeVenta) {
                                        errors.documentodeventa_idDocumentoDeVenta = 'Requerido'
                                    }
                                    if(!values.mediopago_idMedioPago){
                                        errors.mediopago_idMedioPago = 'requerido';
                                    }
                                    return errors
                                }
                            }
                            onChange = {(name, value, { props }) => {
                                props.handleFormChange(name, value); // call some method from parent 
                            }}
                            onSubmit={async (values,{resetForm,submitForm})=>{
                                if(estadoBoton=="Agregar"){
                                    
                                    axios.put('/venta/insertar', { fechaVenta: values.fechaVenta , totalVenta: total , Cliente_idUsuario: cliente.idUsuario , Cajero_idUsuario1: usuario.idUsuario , TipoVenta_idTipoVenta: values.TipoVenta_idTipoVenta , documentodeventa_idDocumentoDeVenta: values.documentodeventa_idDocumentoDeVenta, mediopago_idMedioPago : values.mediopago_idMedioPago, detalleVenta })
                                        .then(res => {
                                            if(res.status===200){
                                                mostrarBoleta(res.data.idVenta, res.data.fechaVenta);
                                                setRespuestaConsulta(
                                                    <div className="alert alert-success" role="alert">
                                                        Datos Ingresados Correctamente
                                                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                    </div>);
                                                cerrar();
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
                                }else if(estadoBoton=="Modificar"){
                                    axios.put('/venta/editar', { idVenta : values.idVenta, fechaVenta: values.fechaVenta , totalVenta: total , Cliente_idUsuario: cliente.idUsuario , Cajero_idUsuario1: usuario.idUsuario , TipoVenta_idTipoVenta: values.TipoVenta_idTipoVenta , documentodeventa_idDocumentoDeVenta: values.documentodeventa_idDocumentoDeVenta, mediopago_idMedioPago : values.mediopago_idMedioPago, detalleVenta })
                                    .then(res => {
                                        if(res.status===200){
                                            resetForm({values: ''});
                                            const usuarioRegistrado = values;
                                            funcionAdicionalSet(usuarioRegistrado);
                                            cerrar();
                                            setValoresFormulario(null);
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
                                        Pagar
                                    </button>
                                    </h2>
                                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <div className="card" style={{"width": "100%"}}>
                                            <div className="card-body">
                                                <InputReadOnly name="idVenta" label="Id Venta"/>
                                                
                                                <InputReadOnly name="totalVenta" label="Total Venta"/>
                                                <InputReadOnly name="Cliente_idUsuario" label="Id Cliente"/>
                                                <InputReadOnly name="Cajero_idUsuario1" label="Id Cajero"/>
                                                <Select name="TipoVenta_idTipoVenta" label="Tipo de Venta">
                                                    <option>Seleccione</option>
                                                    {tipoVenta.map((value,key)=><option key={key+'-estado'} value={value.idTipoVenta}>{value.nombreTipoVenta}</option>)}
                                                </Select>
                                                <Select name="documentodeventa_idDocumentoDeVenta" label="Documento de Venta">
                                                    <option>Seleccione</option>
                                                    {documentoDeVenta.map((value,key)=><option key={key+'-estado'} value={value.idDocumentoDeVenta}>{value.nombreDocumentoDeVenta}</option>)}
                                                </Select>
                                                <Select name="mediopago_idMedioPago" label="Medio de Pago">
                                                    <option>Seleccione</option>
                                                    {medioDePago.map((value,key)=><option key={key+'-estado'} value={value.idMedioPago}>{value.nombreMedioPago}</option>)}
                                                </Select>
                                            </div>
                                            <div className="card-footer">
                                                <div className="row">
                                                    <div className="form-group">
                                                        <div className="input-group">
                                                            <Boton label={"Pagar"} type={"Submit"} className="btn btn-success"/>
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
                            </Form>
                        </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Pagar;