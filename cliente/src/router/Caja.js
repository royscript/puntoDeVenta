import { useEffect, useState } from "react";
import HeaderContainer from "./navegacion/HeaderContainer";
import NavBar from "./navegacion/Navbar";
import SidebarMenu from "./navegacion/SideBarMenu";
import axios from "../api/axios";
import Boton from "../components/formulario/Boton";
import BuscarProductoCajaRegistradora from "../components/formulario/BuscarProductoCajaRegistradora";
import TablaLateralProductos from "../components/formulario/TablaLateralProductos";

const Caja = ({ logOut, usuario})=>{
    const [titulo, setTitulo] = useState();
    const [productoSeleccionado, setProductoSeleccionado] = useState([]);
    const [total, setTotal] = useState(0);
    const buscarProducto = async (codigo,completarFormulario,setMensaje)=>{
        try {
            const resultSet = await axios.post('/productos/buscar', {codigo});
            if(resultSet.data.length>0){
                completarFormulario(resultSet.data);
                return true;
            }else{
                return false;
            }
            
        } catch (error) {
            setMensaje("Esperando el código de barras o interno. Error : "+error);
        }
    }
    useEffect(()=>{
        setTitulo("Caja Registradora");
        setProductoSeleccionado([]);
    },[])
    useEffect(()=>{
        //console.log("Producto alterado");
        //console.log(productoSeleccionado);
    },[productoSeleccionado]);
    return(
        <>
        <NavBar usuario={usuario.nombreUsuario+" "+usuario.apellidoUsuario} logOut={logOut}/>

            <div className="container-fluid">
                <div className="row">
                    <SidebarMenu seccion={"caja"}/>
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <HeaderContainer titulo={titulo}/>
                        <div className="card" style={{"width": "100%"}}>
                            <div className="card-body">
                                <div className="row">
                                <div className="form-group">
                                        <div className="input-group">
                                            <BuscarProductoCajaRegistradora buscarProducto={buscarProducto} setProductoSeleccionado={setProductoSeleccionado} productoSeleccionado={productoSeleccionado} setTotal={setTotal}>

                                            </BuscarProductoCajaRegistradora>
                                            <TablaLateralProductos productos={productoSeleccionado} total={total}/>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            <div className="card-footer">
                                <div className="row">
                                    <div className="form-group">
                                        <div className="input-group">
                                            <Boton label={"Finalizar Compra"} type={"Submit"} className="btn btn-success"/>
                                            <Boton label={"Cancelar Compra"} type={"Submit"} className="btn btn-warning"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}
export default Caja;