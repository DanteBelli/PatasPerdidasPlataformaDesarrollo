import { useState } from "react";
import {useNavigate} from "react-router-dom";
import usuarios from "../data/usuarios"
import { useAuth } from "../context/AuthContext";



export default function Login(){
    const [email,setEmail] = useState("");
    const [password , setPassword] = useState("");
    const {setUsuario} = useAuth();

    const navigate = useNavigate();

    const handleLogin= () => {
        console.log("Email ingresado:", email);
        console.log("Password ingresado:", password);
        console.log("Usuarios disponibles:", usuarios);

        const user = usuarios.find(
            (u) => u.mail === email && u.password === password
        );

        console.log("Resultado de búsqueda:", user);

        if(user){
            setUsuario(user);
            navigate("/mapa");
        }else {
            alert("Usuario Incorrect");
        }
    };

    return(
        <div className="container mt-5">
            <h2>Iniciar Sesion</h2>
            <div className="mb-3">
                <label className="form-label">Mail</label>
                <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
                <label  className="form-label">Contra</label>
                <input type="password" name="" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <button className="btn btn-primary" onClick={handleLogin}>Iniciar Sesion</button>
        </div>
    );
}