import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { MapContainer , TileLayer , Marker , useMapEvent } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});
const ClickUbicacion = 
({ setLatLng }) => {
    useMapEvent({
        click(e){
            setLatLng({ lat: e.latlng.lat , lng : e.latlng.lng});
        },
    });
    return null;
};
export default function NuevaMascota(){
    const {usuario } = useAuth();
    const [nombre , setNombre] = useState("");
    const [tipo,setTipo] = useState("perdida")
    const [descripcion , setDescripcion] = useState("");
    const [latLng, setLatLng] = useState({ lat: -34.6, lng: -58.4 });
    const navigate = useNavigate();
    const handleSubmit = async() => {
    /* se cambia para consumo de api   const nueva = {
        const mascotas = JSON.parse(localStorage.getItem("mascotas")) || [];
        mascotas.push(nueva);
        localStorage.setItem("mascotas", JSON.stringify(mascotas));
        navigate("/mapa");
    };*/
    if(!descripcion.trim()){
        alert("Ingrese descripcion");
        return;
    }
    const nueva = {
            nombre,
            tipo,
            descripcion,
            usuariMail: usuario.email,
            lat: latLng.lat,
            lng: latLng.lng,
            foto: "/img/default.jpg"
    };
    console.log("Datos a enviar:", nueva);

    try{
        const response = await fetch("http://localhost:5000/api/mascotas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify(nueva),
    });
    if(!response.ok){
        const errorData = await response.json();
        alert("Error en el guardado");
        return;
    }
    alert("Se guardo bien");
    navigate("/mapa");
    }catch(error){
        alert("Ocurrio un error",error.message);
    }
};
    return (
        <div className="container mt-4">
            <h3>Nueva Mascota</h3>
            <div className="mb-3">
                <label  className="form-label">Nombre</label>
                <input className="form-control" value={nombre} onChange={(e) =>setNombre(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label  className="form-label"> Tipo</label>
                <select className="form-select" value={tipo} onChange={(e) => setTipo(e.target.value)}>
                    <option value="perdida">Perdida</option>
                    <option value="encontrada">Encontrada</option>
                </select>
            </div>
            <div className="mb-3">
                <label  className="form-label">Descripcion</label>
                <textarea  className="form-control" value={descripcion} onChange={e =>setDescripcion((e).target.value)}>   
                </textarea>
            </div>
            <div className="mb-3">
                <label className="form-label">Ubicación (hacé clic en el mapa)</label>
                <MapContainer center={[latLng.lat, latLng.lng]}zoom={13}style={{ height: "300px", width: "100%" }}>
                    <TileLayer attribution='&copy; OpenStreetMap contributors'url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                    <ClickUbicacion setLatLng={setLatLng} />
                    <Marker position={[latLng.lat, latLng.lng]} />
                </MapContainer>
                <p className="mt-2">
                    <strong>Ubicación seleccionada:</strong> {latLng.lat.toFixed(4)}, {latLng.lng.toFixed(4)}
                </p>
            </div>
            <button className="btn  btn-primary" onClick={handleSubmit}>Guardar</button>
        </div>
    );
}