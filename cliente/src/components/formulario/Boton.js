const Boton = ({label, ...props})=>{
    return(
        <div className="col text-center">
            <button type="submit" className="btn btn-primary" {...props}>{label}</button>
        </div>
    )
}
export default Boton;