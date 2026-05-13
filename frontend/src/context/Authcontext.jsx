import React, { createContext, useState, useEffect } from 'react';
import api from '../api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for token and fetch user on load
        const loadUser = async () => {
            if (localStorage.getItem('token')) {
                try {
                    const res = await api.get('/api/auth/user');
                    setUser(res.data);
                } catch (error) {
                    console.error('Failed to authenticate:', error);
                    localStorage.removeItem('token');
                    setUser(null);
                }
            }
            setLoading(false);
        };
        loadUser();
    }, []);

    const login = async (email, password) => {
        const res = await api.post('/api/auth/login', { email, password });
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
    };

    const register = async (username, email, password) => {
        const res = await api.post('/api/auth/register', { username, email, password });
        localStorage.setItem('token', res.data.token);
        
        // After register, you might want to fetch user data or decode token if the backend doesn't send user object
        // For now, let's just fetch the user again using the loaded token
        try {
            const userRes = await api.get('/api/auth/user');
            setUser(userRes.data);
        } catch (e) {
            console.error('Failed to get user after register');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};