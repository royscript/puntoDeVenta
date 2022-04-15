import { useEffect, useState } from "react";
import axios from "../../../api/axios";
import Input from "../../formulario/Input";
import InputReadOnly from "../../formulario/InputReadOnly";
import Boton from "../../formulario/Boton";
import { Formik, Form } from "formik";

const AgregarCliente = ({cerrar,funcionAdicionalSet})=>{
    const [estadoBoton, setEstadoBoton] = useState();
    const [valoresFormulario, setValoresFormulario] = useState(null);
    const [respuestaConsulta, setRespuestaConsulta] = useState();
    const buscarUsuario = async (rutUsuario)=>{
        try {
            return await axios.post('/usuario/buscar-usuario', {rutUsuario});
        } catch (error) {
            return null;
        }
        
    }
    useEffect(()=>{
        setEstadoBoton("Agregar");
        setValoresFormulario(null);
    },[])
    return(
        <>
            <div className="card" style={{"width": "700px","height": "460px"}}>
                <div className="card-body">
                    <div className="row">
                        <div className="btn-group" role="group" style={{"display":"block"}}>
                        <Formik
                            initialValues={valoresFormulario || {idUsuario : '', nombreUsuario: '' , apellidoUsuario: '' , emailUsuario: '' , rutUsuario: '' , direccionUsuario: '' , telefonoUsuario: ''}}
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
                                    if(!values.rutUsuario) {
                                        errors.rutUsuario = 'Requerido'
                                    } else if (values.rutUsuario.length < 5) {
                                        errors.rutUsuario = 'Ingresa el rut del usuario'
                                    } else {
                                        const resp = await buscarUsuario(values.rutUsuario);
                                        if(resp.data.length>0){
                                            setValoresFormulario(resp.data[0])
                                            setEstadoBoton("Modificar");
                                        }else{
                                            setValoresFormulario(null);
                                            setEstadoBoton("Agregar");
                                        }
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

                                    return errors
                                }
                            }
                            onChange = {(name, value, { props }) => {
                                props.handleFormChange(name, value); // call some method from parent 
                            }}
                            onSubmit={async (values,{resetForm,submitForm})=>{
                                if(estadoBoton=="Agregar"){
                                    axios.put('/usuario/insertar', { nombreUsuario: values.nombreUsuario , apellidoUsuario: values.apellidoUsuario , emailUsuario: values.emailUsuario , rutUsuario: values.rutUsuario, direccionUsuario: values.direccionUsuario , telefonoUsuario: values.telefonoUsuario, Permiso_idPermiso : 4, contrasenaUsuario : '' })
                                        .then(res => {
                                            if(res.status===200){
                                                resetForm({values: ''});
                                                const usuarioRegistrado = values;
                                                usuarioRegistrado.idUsuario = res.data.insertId;
                                                funcionAdicionalSet(usuarioRegistrado);
                                                cerrar();
                                                setValoresFormulario(null);
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
                                }else if(estadoBoton=="Modificar"){
                                    axios.put('/usuario/editar', { idUsuario : values.idUsuario, nombreUsuario: values.nombreUsuario , apellidoUsuario: values.apellidoUsuario , emailUsuario: values.emailUsuario , rutUsuario: values.rutUsuario , direccionUsuario: values.direccionUsuario , telefonoUsuario: values.telefonoUsuario, Permiso_idPermiso : valoresFormulario.Permiso_idPermiso, contrasenaUsuario : valoresFormulario.contrasenaUsuario })
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
                                        Agregar Cliente
                                    </button>
                                    </h2>
                                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <div className="card" style={{"width": "100%"}}>
                                            <div className="card-body">
                                                <InputReadOnly name="idUsuario" label="Id del Usuario"/>
                                                <Input name="rutUsuario" label="Rut del Usuario" autoFocus type="text"/>
                                                <Input name="nombreUsuario" label="Nombres del Usuario" type="text"/>
                                                <Input name="apellidoUsuario" label="Apellidos del Usuario" type="text"/>
                                                <Input name="emailUsuario" label="E-mail del Usuario" type="text"/>
                                                <Input name="direccionUsuario" label="Direccion del Usuario" type="text"/>
                                                <Input name="telefonoUsuario" label="Telefono del Usuario" type="text"/>
                                            </div>
                                            <div className="card-footer">
                                                <div className="row">
                                                    <div className="form-group">
                                                        <div className="input-group">
                                                            <Boton label={estadoBoton} type={"Submit"} className="btn btn-success"/>
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
export default AgregarCliente;