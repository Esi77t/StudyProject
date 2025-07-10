import './App.css';
import Signin from './pages/Signin';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Header from './components/Header';
import DevBoard from './pages/DevBoard';
import MyPage from './pages/MyPage';
import { DevBlogContext } from './context/DevBlogProvider';
import { useContext } from 'react';
import PostDetail from './pages/PostDetail';
import Editor from './pages/Editor';
import PrivateRoute from './components/PrivateRoute';
import ArknightsCalculator from './pages/ArknightsCalculator';

function App() {
    
    const { isLoggedIn } = useContext(DevBlogContext);

    return (
        <BrowserRouter>
            <Header />
            <div style={{ paddingTop: '110px' }}>
                <Routes>
                    <Route path="/login" element={ <Signin /> } />
                    <Route path="/signup" element={ <Signup /> } />
                    <Route path="/arknights-calculator" element={ <ArknightsCalculator /> } />
                    <Route path="/devboard" element={ <DevBoard /> } />
                    <Route path="/devboard/:id" element={ <PostDetail /> } />
                    <Route path="/devobard/write" element={
                        <PrivateRoute isLoggedIn={ isLoggedIn }>
                            <Editor />
                        </PrivateRoute>
                    } />
                    <Route path="/mypage" element={
                        <PrivateRoute isLoggedIn={ isLoggedIn }>
                            <MyPage />
                        </PrivateRoute>
                    } />
                    <Route path="/devboard/edit/:id" element={
                        <PrivateRoute isLoggedIn={ isLoggedIn }>
                            <Editor />
                        </PrivateRoute>
                    } />
                    <Route path="/" element={ <Navigate to="/arknights-calculator" replace /> } />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
