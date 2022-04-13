import { useNavigate } from 'react-router-dom';
const PaginaNoEncontrada = ({sesion})=> {
    const navigate = useNavigate();
    if(sesion===true){
        navigate("/home");
    }else{
        navigate("/Login");
    }
    return (
        <div>
            <h1>PAGINA NO ENCONTRADA</h1>
        </div>
    );
}

export default PaginaNoEncontrada;