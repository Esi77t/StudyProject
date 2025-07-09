const Sidebar = ({ handleMyPostsClick }) => {
    return(
        <div className="blog-sidebar">
            <div className="profile-area">
                <div className="profile-image-placeholder">
                    사진
                </div>
                <h3 className="blog-title">홍길동의 blog</h3>
            </div>
            <div className="category-area">
                <h4 className="category-header">카테고리</h4>
                <ul className="category-list">
                    <li className="category-item">아무거나</li>
                    <li className="category-item">얘기하기</li>
                    <li className="category-mypost" onClick={ handleMyPostsClick }>
                        내가 쓴 게시글
                    </li>
                </ul>
            </div>
        </div>    
    )
}

export default Sidebar;