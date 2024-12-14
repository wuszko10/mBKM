import React,{ createContext,ReactNode,useContext,useEffect,useState } from "react";
import { storage } from "../../../App.tsx";
import { decodeToken,isExpired } from "react-jwt";
import { DecodedToken } from "../../types/interfaces.tsx";

interface AuthContextType {
    token: string | null;
    setToken: (token: string | null) => void;
    userId: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [userId, setUserId] = useState<string>('');


    useEffect(() => {
        const loadToken = async () => {
            try {
                // const savedToken = await AsyncStorage.getItem('token');
                const savedToken = storage.getString('token');

                if (savedToken) {
                    setToken(savedToken);
                    const decodedToken: DecodedToken | null = decodeToken(savedToken);
                    if (decodedToken) {
                        setUserId(decodedToken.userId);
                    }
                    if (isExpired(savedToken)) {
                        setToken(null);
                        storage.delete('token');
                    }
                }
            } catch (error) {
                console.error("Błąd podczas odczytywania tokena z AsyncStorage:", error);
            }
        };

        loadToken();
    }, [token]);

    return (
        <AuthContext.Provider value={{ token, setToken, userId }}>
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
