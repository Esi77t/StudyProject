import { Link, useLocation } from "react-router-dom";
import "../css/Header.css"
import { useContext } from "react";
import { DevBlogContext } from "../context/DevBlogProvider";

const Header = () => {

    const location = useLocation();
    const currentPath = location.pathname;

    const { headerRef, handleLogout, toggleDarkMode, isDarkMode, isLoggedIn } = useContext(DevBlogContext);

    const isActive = (path) => currentPath.startsWith(path);
    
    return(
        <header className="top-nav" ref={ headerRef }>
            <div className="top-utility-bar">
                <div className="top-utility-wrapper">
                    { isLoggedIn ? (
                        <div className="top-actions">
                            <Link to="/mypage" className="action-link">마이페이지</Link>
                            <button onClick={ handleLogout } className="action-link">로그아웃</button>
                            <button onClick={ toggleDarkMode } className="dark-mode-toggle-button">
                                { isDarkMode ? "라이트 모드" : "다크 모드" }
                            </button>
                        </div>
                    ) : (
                        <div className="top-actions">
                            <Link to="/login" className="action-link">로그인</Link>
                            <Link to="/signup" className="action-link">회원가입</Link>
                            <button onClick={ toggleDarkMode } className="dark-mode-toggle-button">
                                { isDarkMode ? "라이트 모드" : "다크 모드" }
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className="main-header-content-area">
                <div className="main-header-wrapper">
                    <div className="logo-container">
                        <p className="logo">DevBlog</p>
                    </div>
                    <nav className="main-nav-container">
                        <ul className="nav-link">
                            <li><Link to="/blog" className={ isActive("/blog") ? "nav-button active" : "nav-button" }>나의 블로그</Link></li>
                            <li><Link to="/devboard" className={ isActive("/devboard") ? "nav-button active" : "nav-button" }>게시판</Link></li>
                        </ul>
                    </nav>
                    <div className="search-container">
                        <input type="text" placeholder="블로그를 검색해보세요." className="search-input" />
                        <button className="search-button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;