import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router';
import './App.css';
import Login from './router/Login';
import Home from './router/Home';
import { useNavigate } from 'react-router-dom';
import PaginaNoEncontrada from './router/PaginaNoEncontrada';
import axios from './api/axios';
import Productos from './router/Productos';
function App() {
    const [usuario, setUsuario] = useState();
    const [sesion, setSesion] = useState(null);
    const [permisos, setPermisos] = useState([]);
    const navigate = useNavigate();
    const logOut = ()=>{
      axios.post('/logoutToken')
            .then(res => {
              setPermisos([]);
              setUsuario();
              setSesion(false);
              navigate("/Login");
              localStorage.setItem("sesion",false);
        })
    }
    const conseguirPermisos = async ()=>{
      //console.log("usuario");
      //console.log(usuario);

      let isMounted = true;
      const controller = new AbortController();

      try {
          const refreshToken = await axios.post('/permisos/refreshToken',[], {
                        headers: {
                        'Authorization': usuario.accessToken
                      }
          })
          //console.log(refreshToken); 
          const response = await axios.post('/permisos/listar', {
                                                                signal: controller.signal,
                                                                idPermiso : usuario.idPermiso
                                                                }, {
                                                                  headers: {
                                                                  'Authorization': usuario.accessToken
                                                                }
          })
          
          //console.log(response.data);
          //isMounted && setUsers(response.data);
      } catch (err) {
          //console.error(err);
         // navigate('/login', { state: { from: location }, replace: true });
      }
      


        return () => {
            isMounted = false;
            controller.abort();
        }

      axios.post('/permisos/listar', { idPermiso : usuario.idPermiso })
            .then(res => {
                //console.log(res);
                setPermisos(res.data)
        }, error =>{
            if (error.response.status === 401) {
                alert("Sin Permisos, comuniquese con el administrador");
            }
        }) 
    }
    const autenticar = (user) =>{
      setUsuario(user);
      setSesion(true);
      localStorage.setItem("sesion",true);
      //conseguirPermisos(user.idPermiso);
    }
    useEffect(()=>{
      if(sesion==true){
        navigate("/home");
      }
      
    },[usuario])
    useEffect(()=>{
      const s = localStorage.getItem("sesion");
      s && JSON.parse(s) ? setSesion(true) : setSesion(false);
    })
    useEffect(()=>{
      console.log(sesion);
      //if(sesion==true) conseguirPermisos(usuario.idPermiso);
    },[sesion])
    return (
      <Routes>
        {!sesion && (
          <Route 
              path="/Login" 
              element={<Login autenticar={autenticar}/>}/>
        )}
        {sesion &&(
           <Route 
           path="/home" 
           element={<Home logOut={logOut} conseguirPermisos={conseguirPermisos} usuario={usuario}/>}/>
        )}
        {sesion &&(
           <Route 
           path="/productos" 
           element={<Productos logOut={logOut} conseguirPermisos={conseguirPermisos} usuario={usuario}/>}/>
        )}
        <Route
          path="*"
          element={<PaginaNoEncontrada/>}
        />
      </Routes>
    );
}

export default App;
