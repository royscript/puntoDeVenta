import FeatherIcon from 'feather-icons-react';
import { Link } from "react-router-dom";
const SidebarMenu = ()=>{
    return(
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div className="position-sticky pt-3">
                <ul className="nav flex-column">
                <li className="nav-item">
                    <div className="nav-link active" aria-current="page" href="#">
                    <FeatherIcon icon="home" />
                    Home
                    </div>
                </li>
                <li className="nav-item">
                    <div className="nav-link" href="#">
                    <FeatherIcon icon="file" />
                    Orders
                    </div>
                </li>
                <li className="nav-item">
                    <Link to="/productos" className="nav-link">
                        <FeatherIcon icon="shopping-cart" />
                        Products
                    </Link>
                </li>
                <li className="nav-item">
                    <div className="nav-link" href="#">
                    <FeatherIcon icon="users" />
                    Customers
                    </div>
                </li>
                <li className="nav-item">
                    <div className="nav-link" href="#">
                    <FeatherIcon icon="bar-chart-2" />
                    Reports
                    </div>
                </li>
                <li className="nav-item">
                    <div className="nav-link" href="#">
                    <FeatherIcon icon="layers" />
                    Integrations
                    </div>
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