import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import './App.css';
import Login from './router/Login';
import Home from './router/Home';
import { useNavigate } from 'react-router-dom';
import PaginaNoEncontrada from './router/PaginaNoEncontrada';
import axios from './api/axios';
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
      console.log("usuario");
      console.log(usuario);
      axios.post('/permisos/listar', { idPermiso : usuario.idPermiso })
            .then(res => {
                console.log(res);
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
        conseguirPermisos();
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
           element={<Home logOut={logOut} conseguirPermisos={conseguirPermisos}/>}/>
        )}
        <Route
          path="*"
          element={<PaginaNoEncontrada/>}
        />
      </Routes>
    );
}

export default App;
