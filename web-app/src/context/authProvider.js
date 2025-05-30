import React, {createContext, useState, useContext, useEffect, useCallback} from 'react';
import {userLogout} from "../services/Users/user.service";
import {toast} from "react-toastify";
import {decodeToken} from "react-jwt";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const loadToken = useCallback(() => {
        if (!loading) return;

        const savedToken = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');

        if (savedToken && savedUser) {

            const parseToken = JSON.parse(savedToken);
            const parseUser = JSON.parse(savedUser);

            setToken(parseToken);
            setUser(parseUser);
        }

        setLoading(false);
    }, [loading]);

    useEffect(() => {
        loadToken();
    }, [loadToken]);

    const logout = useCallback(async () => {
        const response = await userLogout(user.id, token);
        if (response) {
            setToken(null);
            setUser(null);
            localStorage.removeItem('token');
            toast.info('Wylogowano', {
                position: 'top-right',
                theme: "colored",
            });
        } else {
            toast.error('Wylogowanie nie powiodło się', {
                position: 'top-right',
                theme: "colored",
            });
        }
    }, [user, token]);

    useEffect(() => {

        if (token) {
            const decodedToken = decodeToken(String(token));
            const expirationTime = decodedToken && (decodedToken.exp);
            const currentTime = Date.now();
            const timeUntilExpiration = expirationTime && ((expirationTime * 1000) - currentTime);

            if ( timeUntilExpiration && (timeUntilExpiration > 0)) {
                const timeoutId = setTimeout(logout, Number(timeUntilExpiration));
                return () => clearTimeout(timeoutId);
            } else {
                logout().then();
            }
        }
    }, [token]);


    return (
        <AuthContext.Provider value={{ user, token, setToken, setUser, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
