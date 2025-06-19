import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function NuevaMascota(){
    const {usuario } = useAuth();
    const [nombre , setNombre] = useState("");
    const [tipo,setTipo] = useState("perdida")
    const [descripcion , setDescripcion] = useState("");
    const navigate = useNavigate();

    const handleSubmit = () => {
        const nueva = {
            id: Date.now(),
            nombre,
            tipo,
            descripcion,
            usuarioEmail: usuario.email,
            ubicacion: { lat: -34.6, lng: -58.4 },
            foto: "/img/default.jpg"
        };
        const mascotas = JSON.parse(localStorage.getItem("mascotas")) || [];
        mascotas.push(nueva);
        localStorage.setItem("mascotas", JSON.stringify(mascotas));
        navigate("/mapa");
    };

    return (
        <div className="container mt-4">
            <h3>Nueva Mascota</h3>
            <div className="mb-3">
                <label  className="form-label">Nombre</label>
                <input className="form-control" value={nombre} onChange={e =>setNombre(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label  className="form-label"> Tipo</label>
                <select  className="form-select" value={tipo} onChange={e =>setNombre(e.target.value)}>
                    <option value="perdida">Perdida</option>
                    <option value="encontrada">Encontrada</option>
                </select>
            </div>
            <div className="mb-3">
                <label  className="form-label">Descripcion</label>
                <textarea  className="form-control" value={descripcion} onChange={e =>setDescripcion(e.target.value)}>   
                </textarea>
            </div>
            <button className="btn  btn-primary" onClick={handleSubmit}>Guardar</button>
        </div>
    );
}