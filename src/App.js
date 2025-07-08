import './App.css';
import Signin from './pages/Signin';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Header from './components/Header';
import { useEffect, useRef, useState } from 'react';
import DevBoard from './pages/DevBoard';
import Blog from './pages/Blog';
import MyPage from './pages/MyPage';

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const headerRef = useRef();

    useEffect(() => {
        if(isDarkMode) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }, [isDarkMode])

    const toggleDarkMode = () => {
        setIsDarkMode((prev) => !prev);
    }
    
    const handleLogout = () => {
        setIsLoggedIn(false);
    }

    return (
        <BrowserRouter>
            { isLoggedIn ? (
                <>
                    <Header handleLogout={ handleLogout } headerRef={ headerRef } toggleDarkMode={ toggleDarkMode } isDarkMode={ isDarkMode } />
                    <Routes>
                        <Route path="/blog" element={ <Blog /> } />
                        <Route path="/devboard" element={ <DevBoard /> } />
                        <Route path="/mypage" element={ <MyPage /> } />
                        <Route path="*" element={ <Navigate to="/blog" /> } />
                    </Routes>
                </>
            ) : (
                <Routes>
                    <Route path="/login" element={ <Signin setIsLoggedIn={ setIsLoggedIn } /> } />
                    <Route path="/signup" element={ <Signup /> } />
                    <Route path="*" element={ <Navigate to="/login" replace /> } />
                </Routes>
            )}
        </BrowserRouter>
    );
}

export default App;
