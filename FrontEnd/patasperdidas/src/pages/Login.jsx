import { useState } from "react";
import {useNavigate} from "react-router-dom";
/*Se usa la API ahora import usuarios from "../data/usuarios"*/
import { useAuth } from "../context/AuthContext";

export default function Login(){
    const [email,setEmail] = useState("");
    const [password , setPassword] = useState("");
    const {setUsuario} = useAuth();
    const navigate = useNavigate();

    const handleLogin= async () => {
    /* Se usa la Api  console.log("Email ingresado:", email);
        console.log("Password ingresado:", password);
        console.log("Usuarios disponibles:", usuarios);

        const user = usuarios.find(
            (u) => u.mail === email && u.password === password
        );

        console.log("Resultado", user);

        if(user){
            setUsuario(user);
            localStorage.setItem("usuario",JSON.stringify(user));
            navigate("/mapa");
        }else {
            alert("Usuario mal cargasdo");
        }
    };
*/
        try{
            const response = await fetch("http://localhost:5000/api/auth/login",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({email,password})
            });
            const data = await response.json();
            if(response.ok){
                setUsuario(data.usuario);
                localStorage.setItem("usuario",JSON.stringify(data.usuario));
                navigate("/mapa");
            }else{
                alert(data.error  || "Credenciales incorrectas");
            }
        }catch(error){
            console.error("Error al hacer el log",error);
            alert("Ocurrio un error al intentar loguearse");
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