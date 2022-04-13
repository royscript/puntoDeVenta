import { useEffect, useState } from 'react';
import formatoDinero from '../../funciones/formatoDinero';
import './tablaCaja.css'
const TablaLateralProductos = ({productos, total})=>{
    return (
        <>
            <div className="card" style={{"width": "50%"}}>
                <div className="card-body">
                    <div className="mb-3" style={{"height":"100%"}}>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Codigo</th>
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                    <th>Valor</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    productos.map((prod,key)=>{
                                    let subTotal = parseInt(prod.cantidad) * parseInt(prod.precioVentaProducto);
                                    return (<tr key={key+'-prod'}>
                                                <td>{prod.codigoBarraProducto}</td>
                                                <td>{prod.nombreProducto}</td>
                                                <td>{prod.cantidad}</td>
                                                <td>${formatoDinero(prod.precioVentaProducto)}</td>
                                                <td>${formatoDinero(subTotal)}</td>
                                            </tr>)
                                    })
                                }
                                
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th>${formatoDinero(total)}</th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
export default TablaLateralProductos;