import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/DevBoard.css";

const generateDummyPosts = (num) => {

    const dummy = [];
    for (let i = 1; i <= num; i++) {
        dummy.push({
            id: i,
            title: `[게시글] ${ i }번째 개발 블로그 게시글입니다.`,
            author: `작성자${ String.fromCharCode(64 + (i % 3) + 1)}`,
            date: `2025.0${(i % 12) + 1}.${(i % 28) + 1}`,
            views: Math.floor(Math.random() * 1000) + 50,
        });
    }
    return dummy;
};

const DevBoard = () => {
    
    const navigate = useNavigate();

    const [allPosts, setAllPosts] = useState(generateDummyPosts(100));
    const [postsPerPage, setPostsPerPage] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);

    const currentPosts = allPosts.slice(0, 20);

    const handleWriteClick = () => {
        navigate('/devboard/write');
    };

    const handlePostClick = (postId) => {
        navigate(`/devboard/${ postId }`);
    };

    return (
        <div className="devboard-container">
            <div className="devboard-header">
                <h2>Dev 게시판</h2>
                <div className="board-controls">
                    <div className="search-container">
                        <input type="text" placeholder="검색어를 입력하세요." className="search-input" />
                        <button className="search-button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className="post-list-table">
                <div className="post-list-header">
                    <span className="post-header-id">번호</span>
                    <span className="post-header-title">글 제목</span>
                    <span className="post-header-author">작성자</span>
                    <span className="post-header-views">조회수</span>
                </div>
                {currentPosts.length > 0 ? (
                    currentPosts.map(post => (
                        <div key={ post.id } className="post-list-item" onClick={() => handlePostClick(post.id)}>
                            <span className="post-item-id">{ post.id }</span>
                            <span className="post-item-title">{ post.title }</span>
                            <span className="post-item-author">{ post.author }</span>
                            <span className="post-item-views">{ post.views }</span>
                        </div>
                    ))
                ) : (
                    <div className="no-posts">게시글이 없습니다.</div>
                )}
            </div>
            <button className="write-button" onClick={ handleWriteClick }>글쓰기</button>
        </div>
    );
};

export default DevBoard;