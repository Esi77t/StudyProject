import { Link as RouterLink, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { DevBlogContext } from "../context/DevBlogProvider";
import { AppBar, Toolbar, Typography, Box, Button, IconButton, Container, Divider, List, ListItem, ListItemButton, ListItemText, Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Brightness4, Brightness7 } from "@mui/icons-material";

const navItem = [
    { label: '가계부', path: '/accountbook' },
    { label: '게시판', path: '/board' }
]

const Header = () => {
    const location = useLocation();
    const { headerRef, handleLogout, toggleDarkMode, isDarkMode, isLoggedIn } = useContext(DevBlogContext);
    const isActive = (path) => location.pathname.startsWith(path);
    const [mobileOpen, setMobileOpen] = useState(false);
    const handleDrawerToggle = () => setMobileOpen((prev) => !prev);

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>MyAccountBook</Typography>
            <Divider />
            <List>
                {navItem.map((item) => (
                    <ListItem key={item.label} disablePadding>
                        <ListItemButton component={RouterLink} to={item.path} sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <>
            <AppBar
                position="fixed"
                ref={headerRef}
                color="default"
                sx={{
                    boxShadow: 'none',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    backgroundColor: 'background.paper',
                }}
            >
                <Box sx={{ height: { xs: 36, sm: 40 }, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', gap: { xs: 1, sm: 2 }, alignItems: 'center' }}>
                            {isLoggedIn ? (
                                <>
                                    <Button component={RouterLink} to="/mypage" size="small"
                                        sx={{ color: 'text.secondary', fontSize: { xs: '0.75rem', sm: '0.85rem' }, px: 1.2 }}>
                                        마이페이지
                                    </Button>
                                    <Button onClick={handleLogout} size="small"
                                        sx={{ color: 'text.secondary', fontSize: { xs: '0.75rem', sm: '0.85rem' }, px: 1.2 }}>
                                        로그아웃
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button component={RouterLink} to="/login" size="small"
                                        sx={{ color: 'text.secondary', fontSize: { xs: '0.75rem', sm: '0.85rem' }, px: 1.2 }}>
                                        로그인
                                    </Button>
                                    <Button component={RouterLink} to="/signup" size="small"
                                        sx={{ color: 'text.secondary', fontSize: { xs: '0.75rem', sm: '0.85rem' }, px: 1.2 }}>
                                        회원가입
                                    </Button>
                                </>
                            )}
                            <IconButton onClick={toggleDarkMode} color="inherit" size="small">
                                {isDarkMode ? (
                                    <Brightness7 sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }} />
                                ) : (
                                    <Brightness4 sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }} />
                                )}
                            </IconButton>
                        </Box>
                    </Container>
                </Box>
                <Box sx={{ height: { xs: 64, sm: 70 }, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Container maxWidth="lg">
                        <Toolbar disableGutters sx={{ px: { xs: 1.5, sm: 2 }, justifyContent: 'space-between' }}>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                                sx={{ mr: 2, display: { md: 'none' } }}
                            >
                                <MenuIcon />
                            </IconButton>

                            <Typography
                                variant="h6"
                                noWrap
                                component={RouterLink}
                                to="/accountbook"
                                sx={{
                                    fontWeight: 700,
                                    fontSize: { xs: '1.1rem', sm: '1.25rem' },
                                    color: 'inherit',
                                    textDecoration: 'none',
                                    flexGrow: { xs: 1, md: 0 },
                                    textAlign: { xs: 'center', md: 'left' },
                                    mr: { xs: 0, md: 3 },
                                }}
                            >
                                MyAccountBook
                            </Typography>
                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', height: '100%' }}>
                                {navItem.map(({ label, path }) => (
                                    <Box
                                        key={path}
                                        component={RouterLink}
                                        to={path}
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
                                            '&::after': isActive(path) ? {
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
                                                fontSize: { xs: '0.9rem', sm: '1rem' },
                                                fontWeight: isActive(path) ? 600 : 500,
                                            }}
                                        >
                                            {label}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                            <Box sx={{ width: { xs: 48, md: 80 }, display: { xs: 'block', md: 'block' }, ml: { md: 3 } }} />
                        </Toolbar>
                    </Container>
                </Box>
            </AppBar>
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
                }}
            >
                {drawer}
            </Drawer>
        </>
    );
}

export default Header;