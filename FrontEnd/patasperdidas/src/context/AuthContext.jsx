import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children }) => {
    const [usuario , setUsuario ] = useState(null);
    

    return (
        <AuthContext.Provider value={{ usuario, setUsuario }}>            
            {children}
        </AuthContext.Provider>
    );
};