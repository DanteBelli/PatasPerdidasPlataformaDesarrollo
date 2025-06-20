import { Link , useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
export default function NavBar(){
    const {usuario , setUsuario} = useAuth();
    const navigate = useNavigate();

    const handleDesconecta = () => {
        setUsuario(null);
        navigate("/");
    };
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">Patitas Perdidas</Link>
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/mapa">Mapa</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/nueva-mascota">Nueva Mascota</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <button className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown">
                                {usuario ? usuario.email : "Cuenta"}
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end">
                                {usuario ? (
                                    <li>
                                        <button className="dropdown-item" onClick={handleDesconecta}>Cerrar Sesion</button>
                                    </li>
                                ):(
                                    <li>
                                        <Link className="dropdown-item" to="/">Iniciar Sesion</Link>
                                    </li>
                                )}
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}