import { useContext, useEffect, useState } from "react";
import { DevBlogContext } from "../context/DevBlogProvider";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { Box, Button, Container, Paper, Stack, TextField, Typography } from "@mui/material";

const MyPage = () => {

    const { user, setUser } = useContext(DevBlogContext);
    const navigate = useNavigate();

    const [nickname, setNickname] = useState('');

    useEffect(() => {
        if(user) {
            setNickname(user.nickname);
        }
    }, [user]);

    const handleUpdateProfile = async () => {
        if(!nickname.trim()) {
            alert("변경할 닉네임을 입력해주세요.");
            return;
        }

        try {
            await api.put('/api/auth/user/profile', { nickname });
            setUser({ ...user, nickname: nickname});

            alert("프로필이 성공적으로 수정됐습니다.");
        } catch (error) {
            console.error("프로필 수정 실패: ", error);
            alert(error.response?.data?.message || "프로필 수정에 실패했습니다.");
        }
    }

    if(!user) {
        return <Typography>사용자 정보를 불러오고 있습니다.</Typography>
    }

    return(
        <Container maxWidth="sm" sx={{ my: 4 }}>
            <Paper sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom fontWeight={ 600 }>
                    마이페이지
                </Typography>
                <Stack spacing={ 3 } sx={{ mt: 3 }}>
                    <TextField
                        label="아이디"
                        value={ user.username }
                        InputProps={{ readOnly: true }}
                        variant="filled"
                    />
                    <TextField
                        label="이메일"
                        value={ user.email }
                        InputProps={{ readOnly: true }}
                        variant="filled"
                    />
                    <TextField
                        label="닉네임"
                        value={ nickname }
                        onChange={(e) => setNickname(e.target.value)}
                        variant="outlined"
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant="contained" onClick={ handleUpdateProfile }>
                            수정하기
                        </Button>
                    </Box>
                </Stack>
            </Paper>
        </Container>
    )
}

export default MyPage;