import { useParams , useNavigate } from "react-router-dom";
export default function CerrarCaso(){
    const { id } = useParams();
    const navigate = useNavigate();

    const handleCerrar = ()=>{
        let mascotas = JSON.parse(localStorage.getItem("mascotas"))|| [];
        mascotas = mascotas.filter(m => m.id !== parseInt(id));
        localStorage.setItem("mascotas",JSON.stringify(mascotas));
        navigate("/mapa");
    };

    return (
        <div className="container mt-4">
            <h3> Cibfirma cerrar el caso</h3>
            <button className="btn btn-danger me-2" onClick={handleCerrar}>Si</button>
            <button className="btn btn-secondary" onClick={() =>navigate("/mapa")}>Cancelar</button>
        </div>
    );
}