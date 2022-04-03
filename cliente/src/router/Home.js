import { useState } from "react";
import HeaderContainer from "./navegacion/HeaderContainer";
import NavBar from "./navegacion/Navbar";
import SidebarMenu from "./navegacion/SideBarMenu";

const Home = ({children, logOut, conseguirPermisos})=>{
    const [titulo, setTitulo] = useState("Inventario");
    useState(()=>{
        //conseguirPermisos();
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
                    </main>
                </div>
            </div>
        </>
    )
}
export default Home;