import { createContext, useEffect, useMemo, useRef, useState } from "react";

import { ThemeProvider, createTheme } from "@mui/material";
import { CssBaseline } from "@mui/material";
import api from "../api/api";

const DevBlogContext = createContext();

const DevBlogProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('isDarkMode');
        return savedMode ? JSON.parse(savedMode) : false;
    });

    const theme = useMemo(() => createTheme({
        palette: {
            mode: isDarkMode ? 'dark' : 'light',
            background: {
                default: isDarkMode ? '#1e1e1e' : '#f5f6f8',
                paper: isDarkMode ? '#3a3a3a' : '#fff'
            }
        },
        typography: {
            fontFamily: "'Pretendard', sans-serif",
        }
    }), [isDarkMode]);

    useEffect(() => {
        const checkLoginStatus = async () => {
            const token = localStorage.getItem('jwt');

            if(token) {
                try {
                    const profileResponse = await api.get('/api/auth/user/profile');

                    setIsLoggedIn(true);
                    setUser(profileResponse.data);
                } catch (error) {
                    console.error("토큰 인증 실패");
                    localStorage.removeItem('jwt');
                }
            }
            setLoading(false);
        }

        checkLoginStatus();
    }, []);

    const headerRef = useRef(null);

    const toggleDarkMode = () => {
        setIsDarkMode((prev) => !prev);
    }

    const handleLogout = () => {
        alert("로그아웃이 되었습니다.");
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem('jwt');
    }

    const handleLogin = (userData) => {
        setIsLoggedIn(true);
        setUser(userData);
    }

    const contextValue = useMemo(() => ({
        isLoggedIn, setIsLoggedIn, isDarkMode, setIsDarkMode, headerRef, toggleDarkMode, handleLogout, handleLogin, user, setUser, loading
    }), [isLoggedIn, user, loading, isDarkMode])

    if(loading) {
        return null;
    }

    return(
        <DevBlogContext.Provider value={ contextValue }>
            <ThemeProvider theme={ theme }>
                <CssBaseline />
                { children }
            </ThemeProvider>
        </DevBlogContext.Provider>
    )
}

export { DevBlogContext, DevBlogProvider };