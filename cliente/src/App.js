import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import axios from './api/axios';
import { useEffect, useState } from 'react';
function App() {
  const [ usuarios, setUsuarios ] = useState([]);
  useEffect(()=>{
    let isMounted = true;
    const controlador = new AbortController();//Permite detener las llamadas
    const getUsuarios = async ()=>{
      try {
        const response = await axios.get('/usuario/listar',{
          signal: controlador.signal
        });
        console.log(response.data);
        isMounted && setUsuarios(response.data);

        getUsuarios();
        return () =>{//cuando se desmonte el componente finalizaremos cualquier funcion que se encuentre
          //activa en el componente
          isMounted=false;
          controlador.abort();
        }
      } catch (error) {
        
      }
    }
  },[]);
  if(usuarios.length==0){
    return (
      <>
        <Login/>
      </>
    );
  }else{
    return(
      <>
        {
          usuarios.map((element)=><ul>{element.nombre}</ul>)
        }
      </>
    )
  }
  
}

export default App;
