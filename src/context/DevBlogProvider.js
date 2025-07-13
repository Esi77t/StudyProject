import { createContext, useEffect, useMemo, useRef, useState } from "react";

import { ThemeProvider, createTheme } from "@mui/material";
import { CssBaseline } from "@mui/material";

const DevBlogContext = createContext();

const DevBlogProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

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
            fontFamily: "'Noto Sans KR', sans-serif",
        }
    }))

    const headerRef = useRef(null);

    const toggleDarkMode = () => {
        setIsDarkMode((prev) => !prev);
    }

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem('jwt');
    }

    const handleLogin = (userData) => {
        setIsLoggedIn(true);
        setUser(userData);
    }

    const contextValue = { isLoggedIn, setIsLoggedIn, isDarkMode, setIsDarkMode, headerRef, toggleDarkMode, handleLogout, handleLogin, user, setUser }

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