import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import mascotas from "../data/mascotas.json";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:"https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl:"https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const centro = { lat: -34.6037, lng: -58.3816 };
export default function Mapa(){
    const iconoPerdida = new L.Icon({
        iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    });
    const iconoEncontrada = new L.Icon({
        iconUrl: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    });
    const {usuario} = useAuth();
    const [listaDeMascotas, setListaDeMascotas] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const guardadas = JSON.parse(localStorage.getItem("mascotas")) || [];
        setListaDeMascotas([...mascotas, ...guardadas]);
    }, []);
    return (
        <div className="container mt-4">
            <h3>Mascotas</h3>
            <button className="btn btn-success mb-3" onClick={() => navigate("/nueva-mascota")}>
                Agregar Nueva Mascota
            </button>
            <div style={{ height: "400px", width: "100%", marginBottom: "20px" }}>
            <MapContainer center={[centro.lat, centro.lng]}zoom={13}style={{ height: "100%", width: "100%" }}>
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            {listaDeMascotas.filter(m => typeof m.lat === "number" && typeof m.lng === "number").map((mascota) => (
                <Marker key={mascota.id} position={[mascota.lat, mascota.lng]}icon={mascota.tipo === "perdida" ? iconoPerdida : iconoEncontrada}>
                    <Popup>
                        <strong>{mascota.nombre || "Sin nombre"}</strong><br />
                        {mascota.tipo === "perdida" ? "🐾 Perdida" : "Encontrado"}
                    </Popup>
                </Marker>
            ))}
            </MapContainer>
      </div>
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