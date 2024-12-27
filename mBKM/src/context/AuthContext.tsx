import React,{ createContext,ReactNode,useContext,useEffect,useState } from "react";
import { storage } from "../../App.tsx";
import { decodeToken } from "react-jwt";
import { Token,User,WalletDAO } from "../types/interfaces.tsx";

interface AuthContextType {
    token: string | null;
    setToken: (token: string | null) => void;
    userId: string ;
    user: User | null;
    setUser: (user: User | null) => void;
    wallet: WalletDAO | null;
    setWallet: (wallet: WalletDAO | null) => void;
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

            console.log ('token '+ JSON.stringify(parseToken.token));
            console.log ('user '+ JSON.stringify(parseUser));
            console.log ('wallet '+ JSON.stringify(parseWallet));

            setToken(parseToken.token);
            setUser(parseUser);
            setWallet(parseWallet);
            setUserId(parseUser.id);
        }
    };


    useEffect(() => {
        loadToken();
    }, []);

    const autoLogout = () => {
            setToken(null);
            setUser(null);
            setWallet(null)
            setUserId('');
            storage.delete('token');

    }
    useEffect(() => {
        if (token) {

            const decodedToken = decodeToken(token);
            // @ts-ignore
            const expirationTime = decodedToken && (decodedToken.exp);
            const currentTime = Date.now();
            const timeUntilExpiration = expirationTime && ((expirationTime * 1000) - currentTime);
            console.log("remaining time: " + new Date(timeUntilExpiration));

            if ( timeUntilExpiration && (timeUntilExpiration > 0)) {
                const timeoutId = setTimeout(autoLogout, timeUntilExpiration);
                return () => clearTimeout(timeoutId);
            } else {
                console.log("logout");
                autoLogout();
            }
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{ token, setToken, userId, user, setUser, wallet, setWallet }}>
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
