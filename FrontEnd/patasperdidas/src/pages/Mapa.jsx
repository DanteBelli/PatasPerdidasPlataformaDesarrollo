import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Mapa(){
    const {usuario} = useAuth();
    const [mascotas, setMascotas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("/data/mascotas.json")
            .then(res => res.json())
            .then(data => {
                const guardadas = JSON.parse(localStorage.getItem("mascotas")) || [];
                setMascotas([...data, ...guardadas]);
            });      
    }, []);
    return (
        <div className="container mt-4">
            <h3>Mascotas</h3>
            <button className="btn btn-success mb-3" onClick={() => navigate("/nueva-mascota")}>
                Agregar Nueva Mascota
            </button>
            <div className="row">
                {mascotas.map((mascota) => (
                    <div key={mascota.id} className="col-md-4 mb-3">
                        <div className={`card border-${mascota.tipo === 'perdida' ? 'danger' : 'primary'}`}>
                            <img src={mascota.foto} alt="imgMascota" className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title">{mascota.nombre}</h5>
                                <p className="card-text">{mascota.descripcion}</p>
                                <p className="card-text">
                                    <span className={`badge bg-${mascota.tipo === 'perdida' ? 'danger' : 'primary'}`}>{mascota.tipo.toUpperCase()}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}