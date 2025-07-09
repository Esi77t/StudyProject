import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Blog.css"

const generateDummyPosts = (num) => {
    const dummy = [];
    for (let i = 1; i <= num; i++) {
        dummy.push({
            id: i,
            title: `[블로그] ${i}번째 게시글 제목입니다.`,
            author: `블로거${String.fromCharCode(64 + (i % 3) + 1)}`,
            date: `2025.0${(i % 12) + 1}.${(i % 28) + 1}`,
            views: Math.floor(Math.random() * 1000) + 50,
            summary: `이것은 ${i}번째 게시글의 요약 내용입니다. 카드형 레이아웃에서는 제목 아래에 간단한 요약이 표시될 수 있습니다.`,
            tags: ['React', 'CSS', 'JavaScript', 'Web'].sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 1)
        });
    }
    return dummy;
};

const Blog = () => {
    const navigate = useNavigate();

    const [posts, setPosts] = useState(generateDummyPosts(10));
    const [searchTerm, setSearchTerm] = useState('');

    const handleWriteClick = () => {
        navigate('/devboard/write');
    };

    const handlePostClick = (postId) => {
        navigate(`/devboard/${postId}`);
    };

    const handleSearch = () => {
        const filtered = generateDummyPosts(100).filter(post =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.author.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setPosts(filtered.slice(0, 10));
    };

    return (
        <div className="blog-page-container">
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
                    </ul>
                </div>
            </div>
            <div className="blog-main-content">
                <div className="blog-board-header">
                    <h2 className="blog-board-title">아무거나</h2>
                    <div className="blog-board-controls">
                        <div className="search-container">
                            <input
                                type="text"
                                placeholder="검색어를 입력하세요."
                                className="search-input"
                                value={ searchTerm }
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyPress={(e) => { if (e.key === 'Enter') handleSearch(); }}
                            />
                            <button className="search-button" onClick={handleSearch}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="post-card-list">
                    { posts.length > 0 ? (
                        posts.map(post => (
                            <div key={ post.id } className="post-card" onClick={() => handlePostClick(post.id)}>
                                <h3 className="post-card-title">{ post.title }</h3>
                                <p className="post-card-summary">{ post.summary }</p>
                                <div className="post-card-meta">
                                    <span className="post-card-author">{ post.author }</span>
                                    <span className="post-card-date">{ post.date }</span>
                                    <span className="post-card-views">조회수 { post.views }</span>
                                </div>
                                { post.tags && post.tags.length > 0 && (
                                    <div className="post-card-tags">
                                        { post.tags.map(tag => (
                                            <span key={ tag } className="post-card-tag">#{ tag }</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="no-posts">게시글이 없습니다.</div>
                    )}
                </div>
                <button className="write-button" onClick={handleWriteClick}>글쓰기</button>
            </div>
        </div>
    );
}

export default Blog;