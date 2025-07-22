import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DevBlogContext } from "../context/DevBlogProvider";
import { Box, Button, Container, Divider, Stack, TextField, Typography } from "@mui/material"
import api from "../api/api";

const Signin = () => {

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const { handleLogin } = useContext(DevBlogContext);

    const navigate = useNavigate();

    const handleApiLogin = async (event) => {
        event.preventDefault();
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

    const handleFindId = () => {
        navigate("/find-id");
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
                <Stack component="form" spacing={5} sx={{ width: '100%' }} noValidate onSubmit={handleApiLogin}>
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
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={(e) => handleApiLogin(e)}
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
                        }
                    })}>
                    로그인
                </Button>
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={1}
                    sx={{ width: '100%' }}
                >
                    <Button
                        variant="text"
                        sx={{ fontSize: '12px', color: 'text.secondary' }}
                        onClick={handleFindId}
                    >
                        아이디 찾기
                    </Button>
                    <Button
                        variant="text"
                        sx={{ fontSize: '12px', color: 'text.secondary' }}
                    >
                        비밀번호 찾기
                    </Button>
                </Stack>
                <Divider sx={{ mt: 2, fontSize: 12, }} orientation="horizontal" flexItem>또는</Divider>
                <Button
                    type="button"
                    fullWidth
                    variant="text"
                    onClick={handleSignup}
                    sx={{
                        mt: 1,
                        py: '14px',
                        fontSize: '14px',
                    }}>
                    회원이 아니시라면? 회원가입
                </Button>
            </Box>
        </Container>
    )
}

export default Signin;