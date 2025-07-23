import "./App.css"
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
import { Box, Container } from '@mui/material';
import AccountBook from './pages/AccountBook';
import NotFoundPage from './pages/NotFoundPage';
import FindIdPage from './pages/FindIdPage';

function App() {
    
    const { isLoggedIn } = useContext(DevBlogContext);

    return (
        <BrowserRouter>
            <Header />
            <Box component="main" sx={{ paddingTop: '110px' }}>
                    <Routes>
                        <Route path="/" element={ <Navigate to="/accountbook" replace /> } />
                        <Route path="/login" element={ <Signin /> } />
                        <Route path="/find-id" element={ <FindIdPage /> } />
                        <Route path="/signup" element={ <Signup /> } />
                        <Route path="/accountbook" element={ <AccountBook /> } />
                        <Route path="/board" element={ <DevBoard /> } />
                        <Route path="/board/:id" element={ <PostDetail /> } />
                        <Route path="/board/write" element={ <Editor /> } />
                        <Route path="/mypage" element={
                            <PrivateRoute isLoggedIn={ isLoggedIn }>
                                <MyPage />
                            </PrivateRoute>
                        } />
                        <Route path="/board/edit/:id" element={
                            <PrivateRoute isLoggedIn={ isLoggedIn }>
                                <Editor />
                            </PrivateRoute>
                        } />
                        <Route path="*" element={ <NotFoundPage /> } />
                    </Routes>
            </Box>
        </BrowserRouter>
    );
}

export default App;
