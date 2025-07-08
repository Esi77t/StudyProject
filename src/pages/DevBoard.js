import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/DevBoard.css";

const generateDummyPosts = (num) => {
    const dummy = [];
    for (let i = 1; i <= num; i++) {
        dummy.push({
            id: i,
            title: `[공지] ${i}번째 개발 블로그 게시글입니다 - 제목은 길게 써야 잘릴지 안 잘릴지 테스트할 수 있습니다.`,
            author: `개발자${String.fromCharCode(64 + (i % 3) + 1)}`,
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

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost);

    const handleWriteClick = () => {
        navigate('/devboard/write');
    };

    const handlePostClick = (postId) => {
        navigate(`/devboard/${postId}`);
    };

    const handlePostsPerPageChange = (e) => {
        setPostsPerPage(Number(e.target.value));
        setCurrentPage(1);
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
                    <select className="posts-per-page-select" onChange={handlePostsPerPageChange} value={postsPerPage}>
                        <option value={20}>20개씩 보기</option>
                        <option value={40}>40개씩 보기</option>
                        <option value={100}>100개씩 보기</option>
                    </select>
                </div>
            </div>
            <div className="post-card-list">
                {currentPosts.length > 0 ? (
                    currentPosts.map(post => (
                        <div key={post.id} className="post-card" onClick={() => handlePostClick(post.id)}>
                            <div className="post-card-title">{post.title}</div>
                            <div className="post-card-info">
                                <span className="post-card-author">{post.author}</span>
                                <span className="post-card-date">{post.date}</span>
                                <span className="post-card-views">조회수: {post.views}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-posts">게시글이 없습니다.</div>
                )}
            </div>
            <button className="write-button" onClick={handleWriteClick}>글쓰기</button>
        </div>
    );
};

export default DevBoard;