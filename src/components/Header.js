import { Link, useLocation } from "react-router-dom";
import "../css/Header.css"

const Header = ({ handleLogout, headerRef, toggleDarkMode, isDarkMode }) => {

    const location = useLocation();
    const currentPath = location.pathname;

    const isActive = (path) => currentPath.startsWith(path);
    
    return(
        <header className="top-nav" ref={ headerRef }>
            {/* 최상단 보조 정보 바 */}
            <div className="top-utility-bar">
                <div className="top-utility-wrapper">
                    <div className="top-actions">
                        <Link to="/mypage" className="action-link">
                            마이페이지
                        </Link>
                        <button onClick={ handleLogout } className="action-link">
                            로그아웃
                        </button>
                        <button onClick={ toggleDarkMode } className="dark-mode-toggle-button">
                            { isDarkMode ? "라이트 모드" : "다크 모드" }
                        </button>
                    </div>
                </div>
            </div>
            <div className="main-header-content-area">
                <div className="main-header-wrapper">
                    {/* 로고 영역 - 기능 없는 단순 텍스트 */}
                    <div className="logo-container">
                        <p className="logo">DevBlog</p>
                    </div>
                    {/* 메인 내비게이션 메뉴 영역 */}
                    <nav className="main-nav-container">
                        <ul className="nav-link">
                            <li>
                                <Link to="/blog" className={ isActive("/blog") ? "nav-button active" : "nav-button" }>
                                    나의 블로그
                                </Link>
                            </li>
                            <li>
                                <Link to="/devboard" className={ isActive("/devboard") ? "nav-button active" : "nav-button" }>
                                    게시판
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;