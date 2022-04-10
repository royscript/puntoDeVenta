const Boton = ({label, type, ...props})=>{
    return(
        <div className="col text-center">
            <button type={type} className="btn btn-primary" {...props}>{label}</button>
        </div>
    )
}
export default Boton;