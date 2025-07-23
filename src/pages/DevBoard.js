import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, TextField, Box, Stack, CircularProgress, Button, Pagination, MenuItem, Select, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CreateIcon from "@mui/icons-material/Create";
import api from "../api/api";
import CategorySidebar from "../components/CategorySidebar";
import PostTable from "../components/PostTable";
import { DevBlogContext } from "../context/DevBlogProvider";

const DevBoard = () => {

    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [loading, setLoading] = useState(true);

    const [searchType, setSearchType] = useState('title_content');
    const [keyword, setKeyword] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const { isLoggedIn } = useContext(DevBlogContext);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         setLoading(true);
    //         try {
    //             const [categoriesRes, postsRes] = await Promise.all([
    //                 api.get('/api/categories'),
    //                 api.get('/api/posts')
    //             ]);
    //             setCategories(categoriesRes.data);
    //             setPosts(postsRes.data);
    //         } catch (error) {
    //             console.error("데이터를 불러오는데 실패했습니다.", error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     fetchData();
    // }, []);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                if (categories.length === 0) {
                    const categoriesRes = await api.get('/api/categories');
                    setCategories(categoriesRes.data);
                }

                const params = {
                    categoryId: selectedCategoryId,
                    page: currentPage - 1,
                    size: 10,
                    searchType: searchTerm.trim() ? searchType : null,
                    keyword: searchTerm.trim() || null
                };

                const postsRes = await api.get('/api/posts', { params });

                setPosts(postsRes.data.content);
                setTotalPages(postsRes.data.totalPages);

            } catch (error) {
                console.error("데이터를 불러오는데 실패했습니다.", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [selectedCategoryId, currentPage, searchTerm]);

    const selectedCategory = categories.find(cat => cat.id === selectedCategoryId);
    const displayTitle = selectedCategory ? selectedCategory.name : "게시판";

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleCategorySelect = (categoryId) => {
        if (selectedCategoryId !== categoryId) {
            setSelectedCategoryId(categoryId);
            setCurrentPage(1);
            setSearchTerm('');
            setKeyword('');
        }
    };

    const handleSearch = () => {
        setCurrentPage(1);
        setSearchTerm(keyword);
    }

    const handleWrite = () => {
        if (!isLoggedIn) {
            alert("로그인이 필요합니다.");
            navigate("/login");
            return;
        }

        navigate('/board/write');
    }

    return (
        <Container maxWidth="lg" sx={{ my: 4 }}>
            <Paper elevation={0} sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: "column", md: 'row' }, alignItems: 'flex-start', gap: 4 }}>
                    <Box sx={{ width: { xs: '100%', md: '20%' }, flexBasis: '20%', flexShrink: 0, p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                        <CategorySidebar
                            categories={categories}
                            selectedCategoryId={selectedCategoryId}
                            onSelectCategory={handleCategorySelect}
                        />
                    </Box>
                    <Box sx={{ flexGrow: 1, width: '100%' }}>
                        <Stack spacing={3}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="h4" component="h2" fontWeight={600}>
                                    {displayTitle}
                                </Typography>
                                <Stack direction="row" spacing={1}>
                                    <Select
                                        size="small"
                                        value={searchType}
                                        onChange={(e) => setSearchType(e.target.value)}
                                    >
                                        <MenuItem value="title_content">제목+내용</MenuItem>
                                        <MenuItem value="title">제목</MenuItem>
                                        <MenuItem value="content">내용</MenuItem>
                                        <MenuItem value="author">작성자</MenuItem>
                                        <MenuItem value="comment">댓글</MenuItem>
                                    </Select>
                                    <TextField
                                        size="small"
                                        variant="outlined"
                                        placeholder="검색"
                                        value={keyword}
                                        onChange={(e) => setKeyword(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                        InputProps={{
                                            startAdornment: (
                                                <SearchIcon size="small" sx={{ mr: 1, color: '#868686ff' }} />
                                            ),
                                        }}
                                    />
                                    <Button variant="outlined" onClick={handleSearch}>검색</Button>
                                </Stack>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 2, minHeight: 300 }}>
                                {loading ? <CircularProgress /> : <PostTable posts={posts} />}
                            </Box>
                            {posts.length > 0 && (
                                <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                                    <Pagination
                                        count={totalPages}
                                        page={currentPage}
                                        onChange={handlePageChange}
                                        color="primary"
                                    />
                                </Box>
                            )}
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<CreateIcon />}
                                    onClick={handleWrite}
                                >
                                    글쓰기
                                </Button>
                            </Box>
                        </Stack>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}

export default DevBoard;