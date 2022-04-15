import formatoDinero from "../../funciones/formatoDinero";

const ticketVenta = (productos,id,fechaVenta)=>{
    const sitioWeb = 'www.comercial.cl';
    const nombreFantasia = 'Comercial';
    const direccion = 'calle 123, Vallenar';
    const logo = 'https://yt3.ggpht.com/-3BKTe8YFlbA/AAAAAAAAAAI/AAAAAAAAAAA/ad0jqQ4IkGE/s900-c-k-no-mo-rj-c0xffffff/photo.jpg';
    const estilos = `
        <style>
        * {
        font-size: 12px;
        font-family: 'Times New Roman';
        }
        
        td,
        th,
        tr,
        table {
            border-top: 1px solid black;
            border-collapse: collapse;
        }
        
        td.producto,
        th.producto {
            width: 75px;
            max-width: 75px;
        }
        
        td.cantidad,
        th.cantidad {
            width: 40px;
            max-width: 40px;
            word-break: break-all;
        }
        
        td.precio,
        th.precio {
            width: 40px;
            max-width: 40px;
            word-break: break-all;
        }
        
        .centrado {
            text-align: center;
            align-content: center;
        }
        
        .ticket {
            width: 200px;
            max-width: 200px;
        }
        
        img {
            max-width: inherit;
            width: inherit;
        }
        </style>
    `;
    let date = new Date(fechaVenta);

    let dia = date.getDate().toString().padStart(2,'0'),
    mes = (date.getMonth() + 1).toString().padStart(2,'0'),
    ano = date.getFullYear(),
    hora = date.getHours().toString().padStart(2,'0'), 
    minuto = date.getMinutes().toString().padStart(2,'0'),
    segundo = date.getSeconds().toString().padStart(2,'0');
    console.log(fechaVenta);
    var neto = 0;
    var tbody = ``;
    productos.forEach((producto)=>{
        neto += (parseInt(producto.precioVentaProducto)*parseInt(producto.cantidad));
        tbody += `
            <tr>
                <td class="cantidad">${(producto.cantidad+".").toString().padEnd(4,'0')}</td>
                <td class="producto">${producto.nombreProducto.toUpperCase()}</td>
                <td class="precio">$${formatoDinero(parseInt(producto.precioVentaProducto)*parseInt(producto.cantidad))}</td>
            </tr>
        `;
    });
    return `
        <!DOCTYPE html>
        <html>
            <head>
                ${estilos}
            </head>
            <body>
                <div class="ticket">
                    <img
                        src="${logo}"
                        alt="Logotipo">
                    <p class="centrado">${nombreFantasia}
                        <br/>${direccion}
                        <br/>${dia}/${mes}/${ano} ${hora}:${minuto}:${segundo}
                        <br/><b>ID ${id}</b>
                    <p>
                    <table style="width: 100%;">
                        <thead>
                            <tr>
                                <th class="cantidad">CANT</th>
                                <th class="producto">PRODUCTO</th>
                                <th class="precio">$$</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tbody}
                            <tr>
                                <th class="cantidad"></td>
                                <th class="producto">NETO</td>
                                <th class="precio">$${formatoDinero(neto)}</td>
                            </tr>
                            <tr>
                                <th class="cantidad"></td>
                                <th class="producto">IVA (19%)</td>
                                <th class="precio">$${formatoDinero(Math.round((neto*1.19)-neto))}</td>
                            </tr>
                            <tr>
                                <th class="cantidad"></td>
                                <th class="producto">TOTAL</td>
                                <th class="precio">$${formatoDinero(Math.round(neto*1.19))}</td>
                            </tr>
                        </tbody>
                    </table>
                    <p class="centrado">¡GRACIAS POR SU COMPRA!
                        <br>${sitioWeb}</p>
                </div>
                <script>
                    window.print();
                </script>
            </body>
        </html>
        `;
}
export default ticketVenta;