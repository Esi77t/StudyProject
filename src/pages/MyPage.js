import { useContext, useEffect, useState } from "react";
import { DevBlogContext } from "../context/DevBlogProvider";
import api from "../api/api";
import { Box, Button, Container, Divider, Paper, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MyPage = () => {

    const { user, setUser, handleLogout } = useContext(DevBlogContext);

    const [nickname, setNickname] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setNickname(user.nickname);
        }
    }, [user]);

    const handleUpdateProfile = async () => {
        if (!nickname.trim()) {
            alert("변경할 닉네임을 입력해주세요.");
            return;
        }

        try {
            await api.put('/api/auth/user/profile', { nickname });
            setUser({ ...user, nickname: nickname });

            alert("프로필이 성공적으로 수정됐습니다.");
        } catch (error) {
            console.error("프로필 수정 실패: ", error);
            alert(error.response?.data?.message || "프로필 수정에 실패했습니다.");
        }
    }

    const handleDeleteAccount = async () => {
        if (window.confirm("정말로 회원 탈퇴를 하시겠습니까? 모든 데이터가 삭제되며 복구할 수 없습니다.")) {
            try {
                await api.delete('/api/auth/user');
                alert("회원 탈퇴가 완료되었습니다. 이용해주셔서 감사합니다.");
                handleLogout();
                navigate("/");
            } catch (error) {
                console.error("회원 탈퇴 실패:", error);
                alert("회원 탈퇴 중 오류가 발생했습니다.");
            }
        }
    }

    if (!user) {
        return <Typography>사용자 정보를 불러오고 있습니다.</Typography>
    }

    return (
        <Container sx={{ my: 4, width: '35%' }}>
            <Paper elevation={0} sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom fontWeight={600}>
                    마이페이지
                </Typography>
                <Stack spacing={3} sx={{ mt: 3 }}>
                    <TextField
                        label="아이디"
                        value={user.username}
                        InputProps={{ readOnly: true }}
                        variant="filled"
                    />
                    <TextField
                        label="이메일"
                        value={user.email}
                        InputProps={{ readOnly: true }}
                        variant="filled"
                    />
                    <TextField
                        label="닉네임"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        variant="outlined"
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant="contained" onClick={handleUpdateProfile} sx={(theme) => ({
                            backgroundColor: theme.palette.mode === 'dark' ? '#eee' : 'grey.800',
                            color: theme.palette.mode === 'dark' ? '#333' : 'grey.300',
                            '&:hover': {
                                backgroundColor: theme.palette.mode === 'dark' ? '#ddd' : 'grey.700',
                            }
                        })}>
                            수정하기
                        </Button>
                    </Box>
                    <Divider sx={{ my: 4 }} />
                    <Box>
                        <Typography variant="h6" color="error" gutterBottom>
                            회원 탈퇴
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                            회원 탈퇴 시 작성하신 모든 게시글과 댓글이 영구적으로 삭제되며, 복구할 수 없습니다.
                        </Typography>
                        <Button variant="outlined" color="error" onClick={handleDeleteAccount}>
                            회원 탈퇴하기
                        </Button>
                    </Box>
                </Stack>
            </Paper>
        </Container>
    )
}

export default MyPage;