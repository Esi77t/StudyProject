import { createContext, useEffect, useRef, useState } from "react";

const DevBlogContext = createContext();

const DevBlogProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('isDarkMode');
        return savedMode ? JSON.parse(savedMode) : false;
    });

    const headerRef = useRef(null);

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
        localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode)); // 상태 변경 시 로컬 스토리지에 저장
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode((prev) => !prev);
    }

    const handleLogout = () => {
        setIsLoggedIn(false);
    }

    const handleLogin = () => {
        setIsLoggedIn(true);
    }

    const contextValue = { isLoggedIn, setIsLoggedIn, isDarkMode, setIsDarkMode, headerRef, toggleDarkMode, handleLogout, handleLogin }

    return(
        <DevBlogContext.Provider value={ contextValue }>
            { children }
        </DevBlogContext.Provider>
    )
}

export { DevBlogContext, DevBlogProvider };