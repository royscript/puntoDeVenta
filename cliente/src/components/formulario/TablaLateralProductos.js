import { useEffect, useState } from 'react';
import formatoDinero from '../../funciones/formatoDinero';
import './tablaCaja.css'
const TablaLateralProductos = ({productos, total})=>{
    return (
        <>
            <div className="card" style={{"width": "50%"}}>
                <div className="card-body">
                    <div className="mb-3 tableFixHead" style={{"height":"200px"}}>
                        <table className="caja">
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
                                    productos.slice(0).reverse().map((prod,key)=>{
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
                        </table>
                    </div>
                    <table className='caja' style={{"float":"right"}}>
                        <thead>
                            <tr>
                                <th colSpan={4} style={{"textAlign":"right"}}>SubTotal</th>
                                <th>${formatoDinero(total)}</th>
                            </tr>
                            <tr>
                                <th colSpan={4} style={{"textAlign":"right"}}>Impuesto (19%)</th>
                                <th>${formatoDinero(Math.round(parseInt(total)*parseFloat(1.19))-parseInt(total))}</th>
                            </tr>
                            <tr>
                                <th colSpan={4} style={{"textAlign":"right"}}>Total</th>
                                <th>${formatoDinero(Math.round(parseInt(total)*parseFloat(1.19)))}</th>
                            </tr>
                        </thead>
                                
                        </table>
                </div>
            </div>
        </>
    )
}
export default TablaLateralProductos;