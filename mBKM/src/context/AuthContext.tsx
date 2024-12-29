import React,{ createContext,ReactNode,useContext,useEffect,useState } from "react";
import { storage } from "../../App.tsx";
import { decodeToken } from "react-jwt";
import { Token,User,WalletDAO } from "../types/interfaces.tsx";
import axios from "axios";
import { SERVER_URL } from "../../variables.tsx";
import { userLogout } from "../services/user.service.tsx";
import { ToastAndroid } from "react-native";

interface AuthContextType {
    token: string | null;
    setToken: (token: string | null) => void;
    userId: string;
    setUserId: (userId: string)=>void;
    user: User | null;
    setUser: (user: User | null) => void;
    wallet: WalletDAO | null;
    setWallet: (wallet: WalletDAO | null) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [wallet, setWallet] = useState<WalletDAO | null>(null);
    const [userId, setUserId] = useState<string>('');

    const loadToken = () => {
        const savedToken = storage.getString('token');
        const savedUser = storage.getString('user');
        const savedWallet = storage.getString('wallet');

        if (savedToken && savedUser && savedWallet) {

            const parseToken: Token = JSON.parse(savedToken);
            const parseUser: User = JSON.parse(savedUser);
            const parseWallet: WalletDAO = JSON.parse(savedWallet);

            setToken(parseToken.token);
            setUser(parseUser);
            setWallet(parseWallet);
            setUserId(parseUser.id);
        }
    };


    useEffect(() => {
        loadToken();
    }, []);

    const logout = async () => {
        const response = await userLogout(userId, token)
        if (response) {
            setToken(null);
            setUser(null);
            setWallet(null)
            setUserId('');
            storage.delete('token');
        } else {
            ToastAndroid.show('Wylogowanie nie powiodło się', ToastAndroid.SHORT);
        }
    }

    useEffect(() => {
        if (token) {

            const decodedToken = decodeToken(token);
            // @ts-ignore
            const expirationTime = decodedToken && (decodedToken.exp);
            const currentTime = Date.now();
            const timeUntilExpiration = expirationTime && ((expirationTime * 1000) - currentTime);

            if ( timeUntilExpiration && (timeUntilExpiration > 0)) {
                const timeoutId = setTimeout(logout, timeUntilExpiration);
                return () => clearTimeout(timeoutId);
            } else {
                logout().then();
            }
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{ token, setToken, userId, setUserId, user, setUser, wallet, setWallet, logout }}>
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
