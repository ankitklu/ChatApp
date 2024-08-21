import React from 'react'
import { useContext } from 'react'

const AuthContext= React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

function AuthWrapper({childre}){
    return <AuthContext.Provider value={"Hello"}>
        {children}
    </AuthContext.Provider>
}