import { useContext, useState } from "react"
import api from "../api/api";
import { Button, Container, Paper, Stack, TextField, Typography } from "@mui/material";
import { DevBlogContext } from "../context/DevBlogProvider";

const FindIdPage = () => {

    const [email, setEmail] = useState('');
    const [foundUsername, setFoundUsername] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const { isDarkMode } = useContext(DevBlogContext);

    const handFindId = async () => {
        if (!email) {
            alert("이메일을 입력해주세요.");
            return;
        }

        try {
            const response = await api.get(`/api/auth/find-username?email=${email}`);
            setFoundUsername(response.data);
            setErrorMessage('');
        } catch (error) {
            setFoundUsername('');
            setErrorMessage(error.response?.data?.message || "아이디 찾기에 실패했습니다.");
        }
    }

    return (
        <Container maxWidth="sm" sx={{ my: 4 }}>
            <Paper sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom fontWeight={600}>
                    아이디 찾기
                </Typography>
                <Stack spacing={2} sx={{ mt: 3 }}>
                    <TextField
                        label="가입 시 사용한 이메일"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        variant="outlined"
                    />
                    <Button variant="contained" onClick={handFindId} sx={{
                        backgroundColor: isDarkMode ? '#eee' : 'grey.800',
                        color: isDarkMode ? '#333' : 'grey.300',
                        '&:hover': {
                            backgroundColor: isDarkMode ? '#ddd' : 'grey.700',
                        }
                    }}>
                        아이디 찾기
                    </Button>
                    {foundUsername && (
                        <Typography color="primary.main" sx={{ mt: 2, fontWeight: 'bold' }}>
                            {foundUsername}
                        </Typography>
                    )}
                    {errorMessage && (
                        <Typography color="error" sx={{ mt: 2 }}>
                            {errorMessage}
                        </Typography>
                    )}
                </Stack>
            </Paper>
        </Container>
    );
}

export default FindIdPage;