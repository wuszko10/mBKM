import React,{ createContext,useState,useContext,ReactNode,useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storage } from "../../../App.tsx";

interface AuthContextType {
    token: string | null;
    setToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const loadToken = async () => {
            try {
                // const savedToken = await AsyncStorage.getItem('token');
                const savedToken = storage.getString('token');

                if (savedToken) {
                    setToken(savedToken);
                }
            } catch (error) {
                console.error("Błąd podczas odczytywania tokena z AsyncStorage:", error);
            }
        };

        loadToken();
    }, []);

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
