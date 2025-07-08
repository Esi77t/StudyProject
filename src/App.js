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
import PostDetail from './pages/PostDetail';
import Editor from './pages/Editor';

function App() {
    
    const { isLoggedIn, setIsLoggedIn, handleLogout, isDarkMode, toggleDarkMode, headerRef } = useContext(DevBlogContext);

    return (
        <BrowserRouter>
            { isLoggedIn && (
                <Header 
                    handleLogout={ handleLogout } 
                    headerRef={ headerRef } 
                    toggleDarkMode={ toggleDarkMode } 
                    isDarkMode={ isDarkMode } 
                />
            )}
            <div style={{ paddingTop: isLoggedIn ? '110px' : '0px' }}>
                { isLoggedIn ? (
                    <Routes>
                        <Route path="/blog" element={ <Blog /> } />
                        <Route path="/devboard" element={ <DevBoard /> } />
                        <Route path="/devboard/write" element={<Editor />} />
                        <Route path="/devboard/edit/:id" element={<Editor />} />
                        <Route path="/devboard/:id" element={<PostDetail />} />
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
            </div>
        </BrowserRouter>
    );
}

export default App;
