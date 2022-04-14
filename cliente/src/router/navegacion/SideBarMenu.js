import FeatherIcon from 'feather-icons-react';
import { Link } from "react-router-dom";
const SidebarMenu = ({seccion})=>{
    return(
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div className="position-sticky pt-3">
                <ul className="nav flex-column">
                <li className="nav-item">
                    <Link to="/home" className={seccion=='home'?"nav-link active":"nav-link"}>
                        <FeatherIcon icon="home" />
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/familia-producto" className={seccion=='familia-producto'?"nav-link active":"nav-link"}>
                        <FeatherIcon icon="list" />
                        Familia Producto
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/productos" className={seccion=='productos'?"nav-link active":"nav-link"}>
                        <FeatherIcon icon="shopping-bag" />
                        Productos
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/usuarios" className={seccion=='usuarios'?"nav-link active":"nav-link"}>
                        <FeatherIcon icon="users" />
                        Usuarios
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/proveedor" className={seccion=='proveedor'?"nav-link active":"nav-link"}>
                        <FeatherIcon icon="briefcase" />
                        Proveedor
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/documento-compra" className={seccion=='documento-compra'?"nav-link active":"nav-link"}>
                        <FeatherIcon icon="archive" />
                        Documento de Compra
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/compra" className={seccion=='compra'?"nav-link active":"nav-link"}>
                        <FeatherIcon icon="book-open" />
                        Compras
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/tipo-venta" className={seccion=='tipo-venta'?"nav-link active":"nav-link"}>
                        <FeatherIcon icon="archive" />
                        Tipo de Venta
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/documento-de-venta" className={seccion=='documento-de-venta'?"nav-link active":"nav-link"}>
                        <FeatherIcon icon="archive" />
                        Documento de Venta
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/medio-de-pago" className={seccion=='medio-de-pago'?"nav-link active":"nav-link"}>
                        <FeatherIcon icon="archive" />
                        Medio de Pago
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/caja" className={seccion=='caja'?"nav-link active":"nav-link"}>
                        <FeatherIcon icon="shopping-cart" />
                        Caja 
                    </Link>
                </li>
                </ul>

                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span>Saved reports</span>
                <div className="link-secondary" href="#" aria-label="Add a new report">
                    <FeatherIcon icon="plus-circle" />
                </div>
                </h6>
                <ul className="nav flex-column mb-2">
                <li className="nav-item">
                    <div className="nav-link" href="#">
                    <FeatherIcon icon="file-text" />
                    Current month
                    </div>
                </li>
                <li className="nav-item">
                    <div className="nav-link" href="#">
                    <FeatherIcon icon="file-text" />
                    Last quarter
                    </div>
                </li>
                <li className="nav-item">
                    <div className="nav-link" href="#">
                    <FeatherIcon icon="file-text" />
                    Social engagement
                    </div>
                </li>
                <li className="nav-item">
                    <div className="nav-link" href="#">
                    <FeatherIcon icon="file-text" />
                    Year-end sale
                    </div>
                </li>
                </ul>
            </div>
        </nav>
    )
}
export default SidebarMenu;