import { BrowserRouter, Routes , Route } from "react-router-dom";
import Login from "./pages/Login";
import Mapa from "./pages/Mapa";
import NuevaMascota from "./pages/NuevaMascota";
import CerrarCaso from "./pages/CerrarCaso";
import { AuthProvider } from "./context/AuthContext";
import NavBar from "./components/NavBar";
export default function App(){
  return(
    <AuthProvider>
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/mapa" element={<Mapa />} />
          <Route path="/nueva-mascota" element={<NuevaMascota />} />
          <Route path="/cerrar-caso" element={<CerrarCaso />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}