import { useState } from "react";
import "../css/Signup.css"
import { useNavigate } from "react-router-dom";

const Signup = () => {

    // 기본 state
    const [username, setUserName] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");

    // 에러를 담아낼 state
    const [userNameError, setUserNameError] = useState("");
    const [nicknameError, setNicknameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordCheckError, setPasswordCheckError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [nameError, setNameError] = useState("");

    // 비밀번호 가시성 토글을 위한 state
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordCheck, setShowPasswordCheck] = useState(false);

    const navigate = useNavigate();

    // 정규식
    const userNameRegex = /^[a-z0-9]{4,20}$/;
    const passLetterRegex = /[a-zA-Z]/;
    const passNumberRegex = /[0-9]/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const nameRegex = /^[가-힣a-zA-Z]{1,30}$/;

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
        setNickname(e.target.value);
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

    const handleSignupSubmit = () => {
        navigate('/login');
    };

    const handleGoToLogin = () => {
        navigate('/login');
    };

    return (
        <div className="container">
            <div className="signupBox">
                <div className="header">회원가입</div>
                <div className="signupSection">
                    <div className="input-group">
                        <p className="label">아이디</p>
                        <input className="input" type="text" value={ username } onChange={ handleUserNameChange } />
                        { userNameError && <p className="errormessage">{ userNameError }</p> }
                    </div>
                    <div className="input-group">
                        <p className="label">닉네임</p>
                        <input className="input" type="text" value={ nickname } onChange={ handleNicknameChange } />
                        { nicknameError && <p className="errormessage">{ nicknameError }</p> }
                    </div>
                    <div className="input-group">
                        <p className="label">비밀번호</p>
                        <div className="input-field-wrapper">
                            <input
                                className="input"
                                type={ showPassword ? "text" : "password" }
                                value={ password }
                                onChange={ handlePasswordChange }
                            />
                            <button
                                type="button"
                                className="toggle-password-visibility"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                { showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20px" height="20px">
                                        <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5zM12 4.5c-5 0-9.27 3.11-11 7.5 1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 13c-3.12 0-5.65-2.22-6.52-5.5.87-3.28 3.4-5.5 6.52-5.5s5.65 2.22 6.52 5.5c-.87 3.28-3.4 5.5-6.52 5.5z"/>
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20px" height="20px">
                                        <path d="M12 6.5c-3.12 0-5.65 2.22-6.52 5.5.87 3.28 3.4 5.5 6.52 5.5s5.65-2.22 6.52-5.5c-.87-3.28-3.4-5.5-6.52-5.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-11.5c-5 0-9.27 3.11-11 7.5 1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 13c-3.12 0-5.65-2.22-6.52-5.5.87-3.28 3.4-5.5 6.52-5.5s5.65 2.22 6.52 5.5c-.87 3.28-3.4 5.5-6.52 5.5z"/>
                                    </svg>
                                )}
                            </button>
                        </div>
                        { passwordError && <p className="errormessage">{ passwordError }</p> }
                    </div>
                    <div className="input-group">
                        <p className="label">비밀번호 확인</p>
                        <div className="input-field-wrapper">
                            <input
                                className="input"
                                type={ showPasswordCheck ? "text" : "password" }
                                value={ passwordCheck }
                                onChange={ handlePasswordCheckChange }
                            />
                            <button
                                type="button"
                                className="toggle-password-visibility"
                                onClick={() => setShowPasswordCheck(!showPasswordCheck)}
                            >
                                { showPasswordCheck ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20px" height="20px">
                                        <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5zM12 4.5c-5 0-9.27 3.11-11 7.5 1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 13c-3.12 0-5.65-2.22-6.52-5.5.87-3.28 3.4-5.5 6.52-5.5s5.65 2.22 6.52 5.5c-.87 3.28-3.4 5.5-6.52 5.5z"/>
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20px" height="20px">
                                        <path d="M12 6.5c-3.12 0-5.65 2.22-6.52 5.5.87 3.28 3.4 5.5 6.52 5.5s5.65-2.22 6.52-5.5c-.87-3.28-3.4-5.5-6.52-5.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-11.5c-5 0-9.27 3.11-11 7.5 1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 13c-3.12 0-5.65-2.22-6.52-5.5.87-3.28 3.4-5.5 6.52-5.5s5.65 2.22 6.52 5.5c-.87 3.28-3.4 5.5-6.52 5.5z"/>
                                    </svg>
                                )}
                            </button>
                        </div>
                        { passwordCheckError && <p className="errormessage">{ passwordCheckError }</p> }
                    </div>
                    <div className="input-group">
                        <p className="label">이메일</p>
                        <input className="input" type="text" value={ email } onChange={ handleEmailChange } />
                        { emailError && <p className="errormessage">{ emailError }</p> }
                    </div>
                </div>
                <button className="signup-button" onClick={ handleSignupSubmit }>
                    회원가입
                </button>
                <div className="signin-link-area">
                    <button onClick={ handleGoToLogin }>회원이시라면? 로그인</button>
                </div>
            </div>
        </div>
    );
};

export default Signup;