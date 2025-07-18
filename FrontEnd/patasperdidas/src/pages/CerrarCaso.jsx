import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {useAuth} from "../context/AuthContext";

export default function CerrarCaso() {
    const [mascotas, setMascotas] = useState([]);
    const [seleccion, setSeleccion] = useState([]);
    const {usuario}= useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        const controlPermisos = async() =>{
            try{
                const responseUser = await fetch(`http://localhost:5000/api/auth/usuario/${usuario.email}`);
                if (!responseUser.ok)throw new Error("Error al consultar");
                const dataUser = await responseUser.json();
                if(dataUser.rol !== "admin"){
                    alert("Acceso incorrecto");
                    navigate("/mapa");
                    return;
                }
                 const response = await fetch("http://localhost:5000/api/mascotas");
                if (!response.ok) throw new Error("Error al cargar mascotas");
                const data = await response.json();
                setMascotas(data);
            }catch(error){
                console.error(error);
                alert("Error al verificar");
                navigate("/mapa");
            }
        };
        controlPermisos();
    },[usuario,navigate]);
    const toggleSeleccion = (id) => {
        if (seleccion.includes(id)) {
            setSeleccion(seleccion.filter((sid) => sid !== id));
        } else if (seleccion.length < 2) {
            setSeleccion([...seleccion, id]);
        }
    };
    const handleCerrar = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/mascotas/cerrar-caso", {
                method: "POST", // o DELETE según tu API
                headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id1: seleccion[0], id2: seleccion[1] }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            alert("Error al cerrar caso: " + (errorData.message || ""));
            return;
        }
        alert("Caso cerrado correctamente");
        setSeleccion([]);
        const refreshed = await (await fetch("http://localhost:5000/api/mascotas")).json();
        setMascotas(refreshed);
        navigate("/mapa");
        } catch (error) {
        alert("Error al comunicarse con el servidor");
        }
    };
    return (
        <div className="container mt-4">
        <h3>Seleccione 2 mascotas que coincidieron</h3>
        <div className="row">
            {mascotas.map((m) => (
            <div key={m.id} className={`col-md-4 mb-3 ${seleccion.includes(m.id) ? "border border-success" : ""}`}>
            <div className="card p-2">
                <h5>{m.nombre}</h5>
                <p>
                    <strong>Tipo:</strong> {m.tipo}
                </p>
                <p>
                    <strong>Descrip: </strong> {m.descripcion}
                </p>
                <button className={`btn btn-sm ${seleccion.includes(m.id) ? "btn-danger" : "btn-outline-primary"}`} onClick={() => toggleSeleccion(m.id)}>
                    {seleccion.includes(m.id) ? "Quitar" : "Seleccionar"}
                </button>
            </div>
            </div>
            ))}
        </div>
        <div className="mt-4">
            <button className="btn btn-success me-2" onClick={handleCerrar} disabled={seleccion.length !== 2}>
                Cerrar
            </button>
            <button className="btn btn-secondary" onClick={() => navigate("/mapa")}>
            Cancelar
            </button>
            {seleccion.length !== 2 && <p className="text-danger mt-2">Seleccione 2 </p>}
        </div>
    </div>
    );
}