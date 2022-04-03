const Alerta = ({contenido})=>{
    return(
        <div className="alert alert-danger d-flex align-items-center" role="alert">
            <div>
                {contenido}
            </div>
        </div>
    )
}
export default Alerta;