import { useParams , useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function CerrarCaso(){
    const [mascotas,setMascotas] = useState([]);
    const [seleccion , setSeleccion] = useState([]);
    const navigate = useNavigate();
    useEffect(() =>{
        const datos = JSON.parse(localStorage.getItem("mascotas"))  || [];
        setMascotas(datos);
    },[]);
    const toggleSeleccion = (id)=>{
        if(seleccion.includes(id)){
            setSeleccion(seleccion.filter((sid) => sid !== id));
        }else if (seleccion.length < 2){
            setSeleccion([...seleccion, id]);
        }
    };
    const handleCerrar = ()=>{
        const nuevaMascota = mascotas.filter(m => !seleccion.includes(m.id));
        localStorage.setItem("mascotas" , JSON.stringify(nuevaMascota));
        navigate("/mapa");
    };
    return(
        <div className="container mt-4">
            <h3>Seleccione 2 mascotas que coincidieron</h3>
            <p>Desapareceran del mapa una vez ejecutada la accion</p>
            <div className="row">
                {mascotas.map((m) => (
                    <div key={m.id} className={`col-md-4 mb-3 ${seleccion.includes(m.id) ? "border border-success" : ""}`}>
                        <div className="card p-2">
                            <h5>{m.nombre}</h5>
                            <p><strong>Tipo:</strong>{m.tipo}</p>
                            <p><strong>Descrip: </strong>{m.descripcion}</p>
                            <button className={`btn btn-sm ${seleccion.includes(m.id) ? "btn-danger" : "btn-outline-primary"}`}
                                onClick={() => toggleSeleccion(m.id)}>
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
                <button className="btn btn-secondary" onClick={() =>navigate("/mapa")}>
                    Cancelar
                </button>
                {seleccion.length !== 2 && (
                    <p className="text-danger mt-2">Seleccione 2 mascotas porfavor</p>
                )}
            </div>
        </div>
    );
}
