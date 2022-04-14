import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router';
import Login from './router/Login';
import Home from './router/Home';
import { useNavigate } from 'react-router-dom';
import PaginaNoEncontrada from './router/PaginaNoEncontrada';
import axios from './api/axios';
import Productos from './router/Productos';
import FamiliaProducto from './router/FamiliaProducto';
import Usuarios from './router/Usuarios';
import Proveedor from './router/Proveedor';
import DocumentoCompra from './router/DocumentoCompra';
import Compra from './router/Compra';
import DetalleCompra from './router/DetalleCompra';
import Caja from './router/Caja';
import TipoVenta from './router/TipoVenta';
import DocumentoDeVenta from './router/DocumentoDeVenta';
import MedioDePago from './router/MedioDePago';
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
              localStorage.setItem("user",null);
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
      localStorage.setItem("user",JSON.stringify(user));
      navigate("/home");
      //conseguirPermisos(user.idPermiso);
    }
    useEffect(()=>{
      if(sesion===true){
        navigate("/home");
      }
    },[])
    useEffect(()=>{
      const s = localStorage.getItem("sesion");
      const usuarioLocal = localStorage.getItem("user");
      s && JSON.parse(s) ? setSesion(true) : setSesion(false);
      s && JSON.parse(s) ? setUsuario(JSON.parse(usuarioLocal)) : setUsuario(null);
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
        {sesion &&(
           <Route 
           path="/familia-producto" 
           element={<FamiliaProducto logOut={logOut} conseguirPermisos={conseguirPermisos} usuario={usuario}/>}/>
        )}
        {sesion &&(
           <Route 
           path="/usuarios" 
           element={<Usuarios logOut={logOut} conseguirPermisos={conseguirPermisos} usuario={usuario}/>}/>
        )}
        {sesion &&(
           <Route 
           path="/proveedor" 
           element={<Proveedor logOut={logOut} conseguirPermisos={conseguirPermisos} usuario={usuario}/>}/>
        )}
        {sesion &&(
           <Route 
           path="/documento-compra" 
           element={<DocumentoCompra logOut={logOut} conseguirPermisos={conseguirPermisos} usuario={usuario}/>}/>
        )}
        {sesion &&(
           <Route 
           path="/compra" 
           element={<Compra logOut={logOut} conseguirPermisos={conseguirPermisos} usuario={usuario}/>}/>
        )}
        {sesion &&(
           <Route 
           path="/detalle-compra/:idCompraOrigen" 
           element={<DetalleCompra logOut={logOut} conseguirPermisos={conseguirPermisos} usuario={usuario}/>}/>
        )}
        {sesion &&(
           <Route 
           path="/caja" 
           element={<Caja logOut={logOut} usuario={usuario}/>}/>
        )}
        {sesion &&(
           <Route 
           path="/tipo-venta" 
           element={<TipoVenta logOut={logOut} usuario={usuario}/>}/>
        )}
        {sesion &&(
           <Route 
           path="/documento-de-venta" 
           element={<DocumentoDeVenta logOut={logOut} usuario={usuario}/>}/>
        )}
        {sesion &&(
           <Route 
           path="/medio-de-pago" 
           element={<MedioDePago logOut={logOut} usuario={usuario}/>}/>
        )}
        <Route
          path="*"
          element={<PaginaNoEncontrada sesion={sesion}/>}
        />
      </Routes>
    );
}

export default App;
