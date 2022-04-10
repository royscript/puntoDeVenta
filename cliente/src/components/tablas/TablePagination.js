import { useEffect, useState } from "react";
import NumeroPaginas from "./NumeroPaginas";

const TablePagination = ({head,mostrarDatos,data,setCantPorPag,setPagSiguiente}) => {
    const [registros, setRegistros] = useState([]);
    const [paginaActual, setPaginaActual] = useState(1);
    const [paginaClick, setPaginaClick] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState();
    const [totalRegistros, setTotalRegistros] = useState();
    const [cantPPag, setCantPPag] = useState(5);
    function handleChange(event) {
        setCantPorPag(event.target.value);
        setCantPPag(event.target.value);
    }
    useEffect(()=>{
        //console.log(data);
        if(data.cantidad){
            setTotalRegistros(data.cantidad[0].cantidad);
            setRegistros(data.datos);
            setTotalPaginas(Math.ceil(parseInt(totalRegistros)/parseInt(cantPPag)));
        }
    },[data])
    useEffect(()=>{
        //listarProductos();
        setPagSiguiente(paginaClick);
    },[paginaClick])
    return(
        <>
            <div className="table-responsive">
                <div className="row" style={{'marginLeft' : '5px'}}>
                    <b>Cant &nbsp;
                    <select style={{'width': '60px'}} onChange={handleChange}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select></b>
                </div>
                
                <table className="table">
                    <thead>{head}</thead>
                    <tbody>
                        {registros.map((value,index)=>mostrarDatos(value,index))}
                    </tbody>
                </table>
            </div>
            <nav>
                <NumeroPaginas cant={totalPaginas} paginaSeleccionada={setPaginaClick} paginaClick={paginaClick}/>
            </nav>
        </>
        
    )
}
export default TablePagination;