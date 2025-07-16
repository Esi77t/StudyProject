import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DevBlogContext } from "../context/DevBlogProvider";
import { Box, Button, Container, Stack, TextField, Typography } from "@mui/material"
import api from "../api/api";

const Signin = () => {

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const { handleLogin } = useContext(DevBlogContext);

    const navigate = useNavigate();

    const handleApiLogin = async () => {
        try {
            const response = await api.post('/api/auth/login', {
                username: username,
                password: password,
            });

            const token = response.headers['authorization'];
            const userData = response.data;

            if (token) {
                localStorage.setItem('jwt', token);

                handleLogin(userData);

                navigate("/accountbook");
            }
        } catch (error) {
            console.error("로그인 실패: ", error);
            alert("아이디 또는 비밀번호를 확인해주세요.");
        }
    };

    const handleSignup = () => {
        navigate("/signup");
    }

    return (
        <Container
            component="main"
            maxWidth="xs"
            sx={{
                display: 'flex',
                alignItems: 'center',
                minHeight: 'calc(100vh - 110px)'
            }}
        >
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                p: 5,
                backgroundColor: 'background.paper',
                borderRadius: '12px',
            }}>
                <Typography
                    component="h1"
                    sx={{
                        fontSize: '24px',
                        fontWeight: 700,
                        mb: 4
                    }}
                >
                    DevBlog
                </Typography>
                <Stack component="form" spacing={5} sx={{ width: '100%' }} noValidate>
                    <TextField
                        required
                        fullWidth
                        id="username"
                        label="아이디"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        variant="standard"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        InputLabelProps={{ sx: { fontSize: '14px' } }}
                    />
                    <TextField
                        required
                        fullWidth
                        name="password"
                        label="비밀번호"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        variant="standard"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputLabelProps={{ sx: { fontSize: '14px' } }}
                    />
                </Stack>
                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    onClick={handleApiLogin}
                    sx={(theme) => ({
                        mt: 3,
                        mb: 1,
                        py: '14px',
                        fontSize: '16px',
                        fontWeight: '600',
                        backgroundColor: theme.palette.mode === 'dark' ? '#eee' : 'grey.800',
                        color: theme.palette.mode === 'dark' ? '#333' : 'grey.300',
                        '&:hover': {
                        backgroundColor: theme.palette.mode === 'dark' ? '#ddd' : 'grey.700',
                    }})}>
                    로그인
                </Button>
                <Button
                    type="button"
                    fullWidth
                    variant="text"
                    onClick={handleSignup}
                    sx={(theme) => ({
                        py: '14px',
                        fontSize: '14px',
                        backgroundColor: theme.palette.mode === 'dark' ? 'grey.800' : '#eee',
                        color: theme.palette.mode === 'dark' ? 'grey.300' : '#333',
                        '&:hover': {
                        backgroundColor: theme.palette.mode === 'dark' ? 'grey.700' : '#ddd',
                    }})}>
                    회원이 아니시라면? 회원가입
                </Button>
            </Box>
        </Container>
    )
}

export default Signin;