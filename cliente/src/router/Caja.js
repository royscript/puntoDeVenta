import { useEffect, useState } from "react";
import HeaderContainer from "./navegacion/HeaderContainer";
import NavBar from "./navegacion/Navbar";
import SidebarMenu from "./navegacion/SideBarMenu";
import axios from "../api/axios";
import FeatherIcon from 'feather-icons-react';
import BuscarProductoCajaRegistradora from "../components/formulario/BuscarProductoCajaRegistradora";
import TablaLateralProductos from "../components/formulario/TablaLateralProductos";
import ModalGrande from "../components/popUp/ModalGrande";
import BuscarProducto from "../components/popUp/personalizadas/BuscarProducto";
import AgregarCliente from "../components/popUp/personalizadas/AgregarCliente";
import Pagar from "../components/popUp/personalizadas/Pagar";

const Caja = ({ logOut, usuario})=>{
    const [titulo, setTitulo] = useState();
    const [productoSeleccionado, setProductoSeleccionado] = useState([]);
    const [total, setTotal] = useState(0);
    const [productoEncontradoPopUp, setProductoEncontradoPopUp] = useState([]);
    const [cliente, setCliente] = useState(null);
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

    const limpiar=()=>{
        setProductoSeleccionado([]);
        setTotal(0);
        setProductoEncontradoPopUp([]);
        setCliente(null);
    }
    useEffect(()=>{
        setTitulo("Caja Registradora");
        setProductoSeleccionado([]);
    },[])
    useEffect(()=>{
        //console.log("Producto alterado");
        //console.log(productoSeleccionado);
    },[productoSeleccionado]);
    useEffect(()=>{
        
    },[])
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
                                    {cliente!=null?<b>Cliente : {cliente.nombreUsuario} {cliente.apellidoUsuario}</b>:null}
                                </div>
                                <div className="form-group">
                                        <div className="input-group">
                                            <BuscarProductoCajaRegistradora 
                                                buscarProducto={buscarProducto} 
                                                setProductoSeleccionado={setProductoSeleccionado} 
                                                productoSeleccionado={productoSeleccionado} 
                                                setTotal={setTotal}
                                                productoEncontradoPopUp={productoEncontradoPopUp}
                                                >

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
                                            <div className="col text-center" style={{"zIndex":"0"}}>
                                                <div className="btn-group" role="group" aria-label="Basic example">
                                                    {productoSeleccionado.length>0 && cliente!=null?
                                                    <ModalGrande 
                                                        className="btn btn-success"
                                                        Componente={Pagar}
                                                        funcionAdicionalSet={setCliente}
                                                        detalleVenta={productoSeleccionado}
                                                        cliente={cliente}
                                                        usuario={usuario}
                                                        >
                                                        <FeatherIcon icon="dollar-sign" />
                                                        &nbsp;Pagar
                                                    </ModalGrande>
                                                    :
                                                    null
                                                }
                                                    
                                                    <ModalGrande 
                                                        className="btn btn-warning"
                                                        Componente={AgregarCliente}
                                                        funcionAdicionalSet={setCliente}
                                                        >
                                                        <FeatherIcon icon="user-plus" />
                                                        &nbsp;Agregar Cliente
                                                    </ModalGrande>
                                                    <ModalGrande 
                                                        className="btn btn-info"
                                                        Componente={BuscarProducto}
                                                        funcionAdicionalSet={setProductoEncontradoPopUp}
                                                        >
                                                        <FeatherIcon icon="search" />
                                                        &nbsp;Buscar Producto
                                                    </ModalGrande>
                                                    <button type="button" className="btn btn-danger" onClick={
                                                        ()=>limpiar()
                                                    }>
                                                        <FeatherIcon icon="x" />
                                                        &nbsp;Limpiar
                                                    </button>
                                                </div>
                                                
                                            </div>
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