import { User } from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from "../firebase/firebaseconfig";
import { AuthContext } from "./AuthContext";


type NewType = {
    children : React.ReactNode;
};

export const AuthProvider: React.FC<NewType> = ({ children }) =>  {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
            setUser(firebaseUser);
        });

        return unsubscribe;
    }, []);

    

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
