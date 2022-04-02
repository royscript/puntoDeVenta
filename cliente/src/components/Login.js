import { useEffect } from "react";
import axios from 'axios';

const Login = ()=>{
    const logearse = ()=>{
        axios.post(`http://localhost:3001/api/login`, { rutUsuario : '16.428.927-3', contrasena : 'mateo7:21' })
            .then(res => {
                console.log(res);
            })
    }
    useEffect(()=>{
        console.log("hola");
    },[]);
    return(
        <>
            <div>
                <button onClick={()=> logearse()}>Logearse</button>
            </div>
        </>
    )
}
export default Login;