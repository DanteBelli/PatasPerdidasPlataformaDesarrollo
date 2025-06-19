import { BrowserRouter, Routes , Route } from "react-router-dom";
import Login from "./pages/Login";
import Mapa from "./pages/Mapa";
import NuevaMascota from "./pages/NuevaMascota";
import CerrarCaso from "./pages/CerrarCaso";
import { AuthProvider } from "./context/AuthContext";

export default function App(){
  return(
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/mapa" element={<Mapa />} />
          <Route path="/nueva-mascota" element={<NuevaMascota />} />
          <Route path="/cerrar-caso/:id" element={<CerrarCaso />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}