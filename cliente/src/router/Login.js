import { useState } from "react";
import axios from '../api/axios';
import { Formik, Form } from "formik";
import Input from "../components/formulario/Input";
import Boton from "../components/formulario/Boton";
import Alerta from "../components/formulario/Alerta";

const Login = ({autenticar})=>{
    const [errorLogin, setErrorLogin] = useState(null);
    return(
        <Formik
            initialValues={{rutUsuario : '', contrasena : ''}}
            validate={
                (values) => {
                    const errors = {}
                    if(!values.rutUsuario) {
                      errors.rutUsuario = 'Requerido'
                    } else if (values.rutUsuario.length < 5) {
                      errors.rutUsuario = 'Ingresa el Usuario'
                    }
                    if(!values.contrasena) {
                      errors.contrasena = 'Requerido'
                    } else if (values.contrasena.length < 5) {
                      errors.contrasena = 'Ingresa la contraseña'
                    }
                    return errors
                }
            }
            onSubmit={async values=>{
                axios.post('/login', { rutUsuario : values.rutUsuario, contrasena : values.contrasena },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                })
                    .then(res => {
                        console.log(res);
                        autenticar(res.data)
                }, error =>{
                    if (error.response.status === 401) {
                        setErrorLogin("Usuario o contraseña incorrectas");
                    }
                })                
            }}
        >
            <Form>
                <div className="card" style={{"width": "18rem"}}>
                    <div className="card-body">
                        <Input name="rutUsuario" label="Usuario" type="text"/>
                        <Input name="contrasena" label="Contraseña" type="password"/>
                    </div>
                    <div className="card-footer">
                        <Boton label={"Enviar"} type={"submit"}/>
                        <br/>
                        {errorLogin!=null?<Alerta contenido={errorLogin}/>:null}
                    </div>
                </div>
            </Form>
        </Formik>
    )
}
export default Login;