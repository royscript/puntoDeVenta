import { useEffect, useState, useRef } from "react";
import formatoDinero from "../../funciones/formatoDinero";
const useFocus = () => {
    const htmlElRef = useRef(null)
    const setFocus = () => {htmlElRef.current &&  htmlElRef.current.focus()}

    return [ htmlElRef, setFocus ] 
}
const BuscarProductoCajaRegistradora = ({buscarProducto,setProductoSeleccionado, productoSeleccionado, setTotal, productoEncontradoPopUp })=>{
    const [mensaje, setMensaje] = useState('Esperando el código de barras o interno');
    const [producto, setProducto] = useState([]);
    const [parametro, setParametro] = useState('');
    const [estadoBusqueda, setEstadoBusqueda] = useState('codigo');
    const [codigoBuscar, setCodigoBuscar] = useState('');
    const [nombreProducto, setNombreProducto] = useState('');
    const [stock, setStock] = useState('');
    const [precio, setPrecio] = useState(0);
    const [cantidad, setCantidad] = useState(0);
    const inputBusquedaFocus = useRef();
    //------------------------------------------------
    const completarFormulario = (prod)=>{
        setProducto(prod);
        setNombreProducto(prod[0].nombreProducto);
        setStock(prod[0].cantidadProducto);
        setPrecio(prod[0].precioVentaProducto);
    }    
    useEffect(()=>{
        setMensaje("Esperando el código de barras o interno");
        setParametro("");
        //setProducto([]);
    },[])
    useEffect(()=>{
        if((typeof productoEncontradoPopUp.idProducto === 'undefined')==false){
            completarFormulario([productoEncontradoPopUp]);
            buscarPorCodigo(productoEncontradoPopUp.codigoBarraProducto);
            //setInputBusquedaFocus();
            inputBusquedaFocus.current.focus();
            console.log(inputBusquedaFocus.current);
            //agregarCantidad(); ahora dejamos esperando que ingrese la cantidad
        }
    },[productoEncontradoPopUp])
    
    const entregarProducto = (producto, cantidad)=>{
        if(producto.length>0){
            let vector = productoSeleccionado;
            let elementoRepetido = productoSeleccionado.findIndex((e)=>e.idProducto==producto[0].idProducto);
            if(elementoRepetido==-1){
                //console.log("No esta repetido");
                vector.push({
                    ...producto[0],
                    cantidad : parseInt(cantidad)
                });
            }else{
                vector[elementoRepetido].cantidad += parseInt(cantidad);
            }
            var total = 0;
            productoSeleccionado.forEach((el)=>{
                total += parseInt(el.cantidad) * parseInt(el.precioVentaProducto);
            });
            setTotal(total);
            setProductoSeleccionado(vector);
        }
    }
    
    const buscarPorCodigo = (parametro)=>{
        setMensaje("Esperando cantidad");
        setEstadoBusqueda("cantidad");
        setCodigoBuscar(parametro);
        setParametro("");
    }
    const agregarCantidad = (parametro)=>{
        setEstadoBusqueda("codigo");
        setMensaje("Esperando el código de barras o interno");
        setCantidad(parametro);
        setParametro("");
        entregarProducto(producto,parametro);
    }
    return (
        <>
            <div className="card" style={{"width": "50%", "maxHeight" : "350px", "height" : "350px"}}>
                <div className="card-body">
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Producto :</label>
                        <input type={estadoBusqueda==='cantidad'?"number":"text"} 
                            className="form-control is-invalid" autoFocus 
                            onChange={(e)=>setParametro(e.target.value)}
                            ref={inputBusquedaFocus}
                            onKeyDown={async (event) => {
                                if (event.key === 'Enter') {
                                    if(parametro!=null && parametro!='' && typeof(parametro) !== "undefined"){
                                        if(estadoBusqueda==='codigo'){
                                            const resp = await buscarProducto(parametro,completarFormulario,setMensaje);
                                            if(resp===true){
                                                buscarPorCodigo(parametro);
                                            }else{
                                                setMensaje("Condigo no encontrado, esperando el código de barras o interno.");
                                            }
                                            
                                        }else if(estadoBusqueda==='cantidad'){
                                            agregarCantidad(parametro);
                                        }
                                    }
                                }
                            }} 
                            value={parametro}
                        />
                            {mensaje ? 
                                <div className="invalid-feedback">{mensaje}</div>
                                :
                                <div className="valid-feedback"></div>
                            }
                    </div>
                </div>
                <div className="card-footer">
                    <div className="row">
                        <div className="form-group">
                            <div className="input-group">
                                <div className="row g-6">
                                    <div className="col-auto">
                                        <label><b>Codigo</b></label>
                                        <input type="text" className="form-control" readOnly value={codigoBuscar}/>
                                    </div>
                                    <div className="col-auto">
                                        <label><b>Producto</b></label>
                                        <input type="text" className="form-control" readOnly value={nombreProducto}/>
                                    </div>
                                    <div className="col-auto">
                                        <label><b>Stock</b></label>
                                        <input type="text" className="form-control" readOnly value={stock}/>
                                    </div>
                                </div>
                            </div>
                            <div className="input-group">
                                <div className="row g-6">
                                    <div className="col-auto">
                                        <label><b>Precio</b></label>
                                        <input type="text" className="form-control" readOnly value={"$"+formatoDinero(precio)}/>
                                    </div>
                                    <div className="col-auto">
                                        <label><b>Cantidad</b></label>
                                        <input type="text" className="form-control" readOnly value={cantidad}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default BuscarProductoCajaRegistradora;