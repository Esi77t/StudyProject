import { useState } from "react";

const Signup = () => {

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

    // 정규식
    const userNameRegex = /^[a-z0-9]{4,20}$/;
    const passLetterRegex = /[a-zA-Z]/;
    const passNumberRegex = /[0-9]/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const nameRegex = /^[가-힣a-zA-Z]{1,30}$/;

    const handleUserNameChange = (text) => {
        
        setUserName(text);

        if(!username.trim()) {
            setUserNameError("필수 입력 항목 입니다.");
            return;
        } 
        
        if(!userNameRegex.test(username)) {
            setUserNameError("아이디는 소문자 또는 숫자 조합으로 4~20자이내여야 합니다.");
            return;
        }

        setUserNameError("");
    }

    const handleNicknameChange = () => {
        
    }

    const handlePasswordChange = (text) => {

        setPassword(text);

        // 영문자, 숫자 두가지 입력 했을 때 카운트 해줄 변수
        let cnt = 0;

        if(!password.trim()) {
            setPasswordError("필수 입력 항목입니다.");
            return;
        } else {
            if(passLetterRegex.test(password)) cnt++;
            if(passNumberRegex.test(password)) cnt++;

            if(password.length < 6 || password.length > 20 || cnt < 2) {
                setPasswordError("비밀번호는 6~20자이며, 영문자와 숫자 중 2가지 이상 포함해야 합니다.");
                return;
            }
        }

        setPasswordError("");

    }

    const handlePasswordCheckChange = (text) => {
        
        setPasswordCheck(text);

        if(!passwordCheck.trim()) {
            setPasswordCheckError("필수 입력 항목입니다.");
            return;
        }
        if(password !== passwordCheck) {
            setPasswordCheckError("비밀번호가 일치하지 않습니다.");
            return;
        }

        setPasswordCheckError("");

    }

    const handleEmailChange = (text) => {
        
        setEmail(text);

        if(email.trim()) {
            setEmailError("필수 입력 항목입니다.");
            return;
        }
        if(!emailRegex.test(email)) {
            setEmailError("이메일 형식과 맞지 않습니다.");
            return;
        }

        setEmailError("");

    }

    return(
        <div className="container">
            <div className="signupBox">
                <div className="header">
                    회원가입
                </div>
                <div className="signupSection">
                    <div className="usernameSection">
                        <p className="label">아이디</p>
                        <input className="input" type="text" value={ username } onChange={ handleUserNameChange } />
                        <p className="errormessage">{ userNameError }</p>
                    </div>
                    <div className="nicknameSection">
                        <p className="label">닉네임</p>
                        <input className="input" type="text" value={ nickname } onChange={ handleNicknameChange } />
                        <p className="errormessage">{ nicknameError }</p>
                    </div>
                    <div className="passwordSection">
                        <p className="label">비밀번호</p>
                        <input className="input" type="password" value={ password } onChange={ handlePasswordChange } />
                        <p className="errormessage">{ passwordError }</p>
                        <p className="label">비밀번호 확인</p>
                        <input className="input" type="password" value={ passwordCheck } onChange={ handlePasswordCheckChange } />
                        <p className="errormessage">{ passwordCheckError }</p>
                    </div>
                    <div className="emailSection">
                        <p className="label">이메일</p>
                        <input className="input" type="text" value={ email } onChange={ handleEmailChange } />
                        <p className="errormessage">{ emailError }</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;