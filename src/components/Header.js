import { Link as RouterLink, useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import { DevBlogContext } from "../context/DevBlogProvider";
import { AppBar, Toolbar, Typography, Box, Button, IconButton, Container } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";

const Header = () => {

    const location = useLocation();

    const { headerRef, handleLogout, toggleDarkMode, isDarkMode, isLoggedIn } = useContext(DevBlogContext);

    const isActive = (path) => location.pathname.startsWith(path);
    
    return (
        <AppBar
            position="fixed"
            ref={ headerRef }
            color="default"
            sx={{
                boxShadow: 'none',
                borderBottom: '1px solid',
                borderColor: 'divider',
                backgroundColor: 'background.paper',
            }}
        >
            <Box sx={{ height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        { isLoggedIn ? (
                            <>
                                <Button component={ RouterLink } to="/mypage" size="small" sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>마이페이지</Button>
                                <Button onClick={ handleLogout } size="small" sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>로그아웃</Button>
                            </>
                        ) : (
                            <>
                                <Button component={ RouterLink } to="/login" size="small" sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>로그인</Button>
                                <Button component={ RouterLink } to="/signup" size="small" sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>회원가입</Button>
                            </>
                        )}
                        <IconButton onClick={ toggleDarkMode } color="inherit" size="small">
                            { isDarkMode ? <Brightness7 sx={{ fontSize: '1rem' }} /> : <Brightness4 sx={{ fontSize: '1rem' }} /> }
                        </IconButton>
                    </Box>
                </Container>
            </Box>
            <Box sx={{ height: '70px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Container maxWidth="lg">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h5"
                            noWrap
                            component={ RouterLink }
                            to="/accountbook"
                            sx={{ fontWeight: 700, color: 'inherit', textDecoration: 'none' }}
                        >
                            AccountBook
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', height: '100%' }}>
                            <Box
                                component={ RouterLink }
                                to="/accountbook"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    position: 'relative',
                                    height: '70px',
                                    px: 2,
                                    textDecoration: 'none',
                                    transition: 'background-color 0.2s',
                                    '&:hover': {
                                        backgroundColor: 'action.hover',
                                        borderRadius: '8px 8px 0 0',
                                    },
                                    '&::after': isActive('/accountbook') ? {
                                        content: '""',
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        height: '2.5px',
                                        backgroundColor: 'text.primary',
                                    } : {},
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: 'text.primary',
                                        fontSize: '1rem',
                                        fontWeight: isActive('/accountbook') ? 600 : 500,
                                    }}
                                >
                                    가계부
                                </Typography>
                            </Box>
                            <Box
                                component={ RouterLink }
                                to="/board"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    position: 'relative',
                                    height: '70px',
                                    px: 2,
                                    textDecoration: 'none',
                                    transition: 'background-color 0.2s',
                                    '&:hover': {
                                        backgroundColor: 'action.hover',
                                        borderRadius: '8px 8px 0 0',
                                    },
                                    '&::after': isActive('/board') ? {
                                        content: '""',
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        height: '2.5px',
                                        backgroundColor: 'text.primary',
                                    } : {},
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: 'text.primary',
                                        fontSize: '1rem',
                                        fontWeight: isActive('/board') ? 600 : 500,
                                    }}
                                >
                                    게시판
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ width: 80 }} />
                    </Toolbar>
                </Container>
            </Box>
        </AppBar>
    );
}

export default Header;