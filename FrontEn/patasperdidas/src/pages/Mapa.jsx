import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import mascotas from "../data/mascotas.json";
import { GoogleMap , Marker , useJsApiLoader } from "@react-google-maps/api";

const centro = { lat:-34.6037 , lng:-58.3816}

const containerStyle = {
    width: "100%",
    height:"400px",
};

export default function Mapa(){
    const {usuario} = useAuth();
    const [listaDeMascotas, setListaDeMascotas] = useState([]);
    const navigate = useNavigate();
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey:"AIzaSyBWO8J564_rA-qiIqLITKedmqOhRej9e_A",
    });
    useEffect(() => {
        const guardadas = JSON.parse(localStorage.getItem("mascotas")) || [];
        setListaDeMascotas([...mascotas, ...guardadas]);
    }, []);
    return (
        <div className="container mt-4">
            <h3>Mascotas</h3>
            <button className="btn btn-success mb-3" onClick={() => navigate("/nueva-mascota")}>
                Agregar Nueva Masc1ota
            </button>
            {isLoaded ? (
                <GoogleMap mapContainerStyle={containerStyle} center={centro} zoom={10}>
                    {listaDeMascotas.map((mascota) => (
                        <Marker
                            key={mascota.id}
                            position={mascota.ubicacion}
                            icon={{url: mascota.tipo === "perdida"
                            ? "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                            : "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                            }}
                        />
                    ))}
                </GoogleMap>
            ):(
                <p>Cargando</p>
            )}
            <div className="row mt-4">
                {listaDeMascotas.map((mascota) => (
                    <div key={mascota.id} className="col-md-4 mb-3">
                        <div className={`card border-${mascota.tipo === "perdida" ? "danger" : "primary"}`}>
                            <img src={mascota.foto}alt="imgMascota"className="card-img-top img-fluid"style={{ height: "200px", objectFit: "cover" }}/>
                            <div className="card-body">
                                <h5 className="card-title">{mascota.nombre || "Sin nombre"}</h5>
                                <p className="card-text">{mascota.descripcion}</p>
                                <p className="card-text">
                                    <span className={`badge bg-${ mascota.tipo === "perdida" ? "danger" : "primary"}`}>{mascota.tipo.toUpperCase()}
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