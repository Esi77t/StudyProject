import './App.css';
import Signin from './pages/Signin';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Header from './components/Header';
import DevBoard from './pages/DevBoard';
import Blog from './pages/Blog';
import MyPage from './pages/MyPage';
import { DevBlogContext } from './context/DevBlogProvider';
import { useContext } from 'react';

function App() {
    
    const { isLoggedIn, setIsLoggedIn, handleLogout, isDarkMode, toggleDarkMode, headerRef } = useContext(DevBlogContext);

    return (
        <BrowserRouter>
            {isLoggedIn && (
                <Header 
                    handleLogout={ handleLogout } 
                    headerRef={ headerRef } 
                    toggleDarkMode={ toggleDarkMode } 
                    isDarkMode={ isDarkMode } 
                />
            )}
            {isLoggedIn ? (
                <Routes>
                    <Route path="/blog" element={ <Blog /> } />
                    <Route path="/devboard" element={ <DevBoard /> } />
                    <Route path="/mypage" element={ <MyPage /> } />
                    <Route path="*" element={ <Navigate to="/blog" replace /> } />
                </Routes>
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
