import { useState } from "react";
import HeaderContainer from "./navegacion/HeaderContainer";
import NavBar from "./navegacion/Navbar";
import SidebarMenu from "./navegacion/SideBarMenu";
import axios from "../api/axios";

const Home = ({children, logOut, conseguirPermisos, usuario})=>{
    const [titulo, setTitulo] = useState();
    const listarUsuario = async ()=>{
        const resultSet = await axios.get('/usuario/listar',[]);
        console.log(resultSet);
    }
    useState(()=>{
        setTitulo("Inventario");
        conseguirPermisos();
        console.log(usuario);
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
                        <button onClick={()=>listarUsuario()}>Listar Usuarios</button>
                    </main>
                </div>
            </div>
        </>
    )
}
export default Home;