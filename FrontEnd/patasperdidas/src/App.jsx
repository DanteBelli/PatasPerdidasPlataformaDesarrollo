import { BrowserRouter, Routes , Route } from "react-router-dom";
import Login from "./pages/Login";
import Mapa from "./pages/Mapa";
import NuevaMascota from "./pages/NuevaMascota";
import CerrarCaso from "./pages/CerrarCaso";
import { AuthProvider } from "./context/AuthContext";
import NavBar from "./components/NavBar";
import RutaPrivada from "./components/RutaPrivada";
export default function App(){
  return(
    <AuthProvider>
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/mapa" element={
              <RutaPrivada>
                <Mapa />
              </RutaPrivada>
            }/>
          <Route path="/nueva-mascota" element={
              <RutaPrivada>
                <NuevaMascota />
              </RutaPrivada>
          }/>
          <Route path="/cerrar-caso" element={
              <RutaPrivada>
                <CerrarCaso />
                </RutaPrivada>
          }/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}