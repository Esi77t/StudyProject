import { useState } from "react";
import "../css/Signin.css"
import { useNavigate } from "react-router-dom";

const Signin = () => {
    
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSignin = () => {
        console.log("아이디 : ", username, "비밀번호 : ", password)
    }

    const handleSignup = () => {
        navigate("/signup");
    }

    return(
        <div className="container">
            <div className="loginBox">
                <div className="header">
                    로그인
                </div>
                <div className="loginSection">
                    <p className="idLabel">아이디</p>
                    <input className="input" type="text" value={ username } onChange={ text => setUserName(text.target.value) } />
                    <p className="passwordLabel">비밀번호</p>
                    <input className="input" type="password" value={ password } onChange={ text => setPassword(text.target.value) } />
                </div>
                <div className="signin">
                    <button onClick={ handleSignin }>로그인</button>
                </div>
                <div className="signup">
                    <button onClick={ handleSignup }>회원이 아니시라면? 회원가입</button>
                </div>
            </div>
        </div>
    )
}

export default Signin;