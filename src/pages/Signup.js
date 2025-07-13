import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Container, Stack, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { DevBlogContext } from "../context/DevBlogProvider";
import api from "../api/api";

const Signup = ({ children }) => {

    // 기본 state
    const [username, setUserName] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [email, setEmail] = useState("");

    // 에러를 담아낼 state
    const [userNameError, setUserNameError] = useState("");
    const [nicknameError, setNicknameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordCheckError, setPasswordCheckError] = useState("");
    const [emailError, setEmailError] = useState("");

    // 비밀번호 가시성 토글을 위한 state
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordCheck, setShowPasswordCheck] = useState(false);

    const navigate = useNavigate();

    // 정규식
    const userNameRegex = /^[a-z0-9]{4,20}$/;
    const passLetterRegex = /[a-zA-Z]/;
    const passNumberRegex = /[0-9]/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const { isDarkMode } = useContext(DevBlogContext);

    const handleUserNameChange = (e) => {
        
        const text = e.target.value;
        setUserName(text);

        if (!text.trim()) {
            setUserNameError("필수 입력 항목 입니다.");
        } else if (!userNameRegex.test(text)) {
            setUserNameError("아이디는 소문자 또는 숫자 조합으로 4~20자이내여야 합니다.");
        } else {
            setUserNameError("");
        }
    };

    const handleNicknameChange = (e) => {

        const text = e.target.value;
        setNickname(text);
        if(!text.trim()) {
            setNicknameError("닉네임은 필수 입력 항목입니다.");
        } else {
            setNicknameError("");
        }
    };

    const handlePasswordChange = (e) => {
        
        const text = e.target.value;
        setPassword(text);
        let cnt = 0;

        if (!text.trim()) {
            setPasswordError("필수 입력 항목입니다.");
        } else {
            if (passLetterRegex.test(text)) cnt++;
            if (passNumberRegex.test(text)) cnt++;
            if (text.length < 6 || text.length > 20 || cnt < 2) {
                setPasswordError("비밀번호는 6~20자이며, 영문자와 숫자 중 2가지 이상 포함해야 합니다.");
            } else {
                setPasswordError("");
            }
        }
    };

    const handlePasswordCheckChange = (e) => {
        
        const text = e.target.value;
        setPasswordCheck(text);

        if (!text.trim()) {
            setPasswordCheckError("필수 입력 항목입니다.");
        } else if (password !== text) {
            setPasswordCheckError("비밀번호가 일치하지 않습니다.");
        } else {
            setPasswordCheckError("");
        }
    };

    const handleEmailChange = (e) => {
        
        const text = e.target.value;
        setEmail(text);
        
        if (!text.trim()) {
            setEmailError("필수 입력 항목입니다.");
        } else if (!emailRegex.test(text)) {
            setEmailError("이메일 형식과 맞지 않습니다.");
        } else {
            setEmailError("");
        }
    };

    const handleSignupSubmit = async () => {
        if(userNameError || passwordError || passwordCheckError || emailError || nicknameError || !username || !password) {
            alert("입력 정보를 다시 입력해주세요.");
            return;
        }

        try {
            const requestDto = { username, password, email, nickname };

            await api.post('/api/auth/signup', requestDto);

            alert("회원가입에 성공했습니다! 로그인 페이지로 이동합니다.");
            navigate('/login');
        } catch (error) {
            console.error("회원가입 실패: ", error);
            if(error.response && error.response.data) {
                alert(error.response.data.message);
            } else {
                alert("회원가입에 실패했습니다.");
            }
        }
    };

    const handleGoToLogin = () => {
        navigate('/login');
    };

    return(
        <Container component="main" maxWidth="sm">
            <Box sx={{ my: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ 
                    width: '100%',
                    p: 5,
                    backgroundColor: 'background.paper',
                    borderRadius: '12px',
                }}>
                    <Typography component="h1" variant="h5" align="center" fontWeight="700" mb={ 4 }>
                        회원가입
                    </Typography>
                    <Stack component="form" spacing={ 5 } noValidate>
                        <TextField
                            required fullWidth variant="standard" label="아이디" value={ username } onChange={ handleUserNameChange }
                            error={ !!userNameError } helperText={ userNameError }
                        />
                        <TextField
                            fullWidth variant="standard" label="닉네임" value={ nickname } onChange={ handleNicknameChange }
                            error={ !!nicknameError } helperText={ nicknameError }
                        />
                        <TextField
                            required fullWidth variant="standard" label="비밀번호" value={password} onChange={ handlePasswordChange }
                            type={ showPassword ? "text" : "password" } error={ !!passwordError } helperText={ passwordError }
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                                            { showPassword ? <VisibilityOff /> : <Visibility /> }
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <TextField
                            required fullWidth variant="standard" label="비밀번호 확인" value={ passwordCheck } onChange={ handlePasswordCheckChange }
                            type={ showPasswordCheck ? "text" : "password" } error={ !!passwordCheckError } helperText={ passwordCheckError }
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPasswordCheck(!showPasswordCheck)}>
                                            { showPasswordCheck ? <VisibilityOff /> : <Visibility /> }
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }} 
                        />
                        <TextField
                            required fullWidth variant="standard" label="이메일" value={ email } onChange={ handleEmailChange }
                            error={!!emailError} helperText={ emailError }
                        />
                    </Stack>
                    <Stack noValidate>
                        <Button
                            type="button" fullWidth variant="contained" onClick={ handleSignupSubmit }
                            sx={{
                                mt: 3, mb: 1, py: '14px', fontSize: '16px', fontWeight: '600',
                                backgroundColor: isDarkMode ? '#eee' : 'grey.800',
                                color: isDarkMode ? '#333' : 'grey.300',
                                '&:hover': {
                                    backgroundColor: isDarkMode ? '#ddd' : 'grey.700',
                                }
                            }}
                        >
                            회원가입
                        </Button>
                        <Button
                            type="button" onClick={ handleGoToLogin }
                                sx={{
                                py: '14px', fontSize: '14px',
                                textDecoration: 'underline',
                                color: (theme) => theme.palette.mode === 'dark' ? 'grey.400' : 'grey.600',
                            }}
                        >
                            회원이시라면? 로그인
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Container>
    );
}

export default Signup;