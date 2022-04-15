import { useEffect, useState } from "react";
import formatoDinero from "../../../funciones/formatoDinero";
import TablePagination from "../../tablas/TablePagination";
import axios from "../../../api/axios";

const BuscarProducto = ({cerrar,funcionAdicionalSet})=>{
    const [buscar, setBuscar] = useState();
    const [productos, setProductos] = useState([]);
    const [pagSiguiente, setPagSiguiente] = useState(1);
    const [cantPorPag, setCantPorPag] = useState(5);
    const listarProductos = async (search)=>{
        try {
            const resultSet = await axios.post('/productos/listar', {pagSiguiente : pagSiguiente, cantPorPag : cantPorPag, search, paraVentas : true});
            setProductos(resultSet.data);
        } catch (error) {
            
        }
        
    }
    useEffect(()=>{
        listarProductos();
    },[pagSiguiente,cantPorPag])
    return(
        <>
            <div className="card" style={{"width": "700px","height": "460px"}}>
                <div className="card-body">
                    <div className="row">
                        <div className="btn-group" role="group" style={{"display":"block"}}>
                            <TablePagination
                                head={
                                    <tr>
                                        <th>Codigo</th>
                                        <th>Producto</th>
                                        <th>Cantidad</th>
                                        <th>Precio Venta</th>
                                        <th>Accion</th>
                                    </tr>
                                }
                                mostrarDatos={
                                    (value,index)=>
                                    <tr key={index+'fila'}>
                                        <td>{value.codigoBarraProducto}</td>
                                        <td>{value.nombreProducto}</td>
                                        <td>{formatoDinero(value.cantidadProducto)}</td>
                                        <td>$ {formatoDinero(value.precioVentaProducto)}</td>
                                        <td>
                                            <div className="btn-group" role="group">
                                                <button type="button" className="btn btn-warning" onClick={
                                                    ()=>{
                                                        funcionAdicionalSet(value);
                                                        cerrar();
                                                    }
                                                }>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hand-index" viewBox="0 0 16 16">
                                                        <path d="M6.75 1a.75.75 0 0 1 .75.75V8a.5.5 0 0 0 1 0V5.467l.086-.004c.317-.012.637-.008.816.027.134.027.294.096.448.182.077.042.15.147.15.314V8a.5.5 0 1 0 1 0V6.435a4.9 4.9 0 0 1 .106-.01c.316-.024.584-.01.708.04.118.046.3.207.486.43.081.096.15.19.2.259V8.5a.5.5 0 0 0 1 0v-1h.342a1 1 0 0 1 .995 1.1l-.271 2.715a2.5 2.5 0 0 1-.317.991l-1.395 2.442a.5.5 0 0 1-.434.252H6.035a.5.5 0 0 1-.416-.223l-1.433-2.15a1.5 1.5 0 0 1-.243-.666l-.345-3.105a.5.5 0 0 1 .399-.546L5 8.11V9a.5.5 0 0 0 1 0V1.75A.75.75 0 0 1 6.75 1zM8.5 4.466V1.75a1.75 1.75 0 1 0-3.5 0v5.34l-1.2.24a1.5 1.5 0 0 0-1.196 1.636l.345 3.106a2.5 2.5 0 0 0 .405 1.11l1.433 2.15A1.5 1.5 0 0 0 6.035 16h6.385a1.5 1.5 0 0 0 1.302-.756l1.395-2.441a3.5 3.5 0 0 0 .444-1.389l.271-2.715a2 2 0 0 0-1.99-2.199h-.581a5.114 5.114 0 0 0-.195-.248c-.191-.229-.51-.568-.88-.716-.364-.146-.846-.132-1.158-.108l-.132.012a1.26 1.26 0 0 0-.56-.642 2.632 2.632 0 0 0-.738-.288c-.31-.062-.739-.058-1.05-.046l-.048.002zm2.094 2.025z"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                }
                                data={productos}
                                setCantPorPag={setCantPorPag}
                                setPagSiguiente={setPagSiguiente}
                                funcionDeDatos={listarProductos}
                                placeHolderSearch="Buscar por Codigo de Barra y nombres de productos"
                            />
                        </div>
                                
                    </div>
                </div>
            </div>
        </>
    )
}
export default BuscarProducto;