import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, TextField, IconButton, Box, Stack, CircularProgress, Button, Pagination } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CreateIcon from "@mui/icons-material/Create";
import api from "../api/api";
import CategorySidebar from "../components/CategorySidebar";
import PostTable from "../components/PostTable";

const DevBoard = () => {
    
    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [categoriesRes, postsRes] = await Promise.all([
                    api.get('/api/categories'),
                    api.get('/api/posts')
                ]);
                setCategories(categoriesRes.data);
                setPosts(postsRes.data);
            } catch (error) {
                console.error("데이터를 불러오는데 실패했습니다.", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

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
                    size: 10
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
    }, [selectedCategoryId, currentPage]);

    const selectedCategory = categories.find(cat => cat.id === selectedCategoryId);
    const displayTitle = selectedCategory ? selectedCategory.name : "게시판";

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };


    return (
        <Container maxWidth="lg" sx={{ my: 4 }}>
            <Box sx={{ display: 'flex', gap: 4 }}>
                <Box sx={{ flexBasis: '20%', flexShrink: 0, p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                    <CategorySidebar
                        categories={ categories }
                        selectedCategoryId={ selectedCategoryId }
                        onSelectCategory={ setSelectedCategoryId }
                    />
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    <Stack spacing={3}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h4" component="h2" fontWeight={600}>
                                { displayTitle }
                            </Typography>
                            <TextField
                                size="small"
                                variant="outlined"
                                placeholder="검색..."
                                InputProps={{
                                    endAdornment: (
                                        <IconButton type="button" size="small"><SearchIcon /></IconButton>
                                    ),
                                }}
                            />
                        </Box>
                        { loading ? <CircularProgress /> : <PostTable posts={ posts } /> }
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
                                onClick={() => navigate('/devboard/write')}
                            >
                                글쓰기
                            </Button>
                        </Box>
                    </Stack>
                </Box>
            </Box>
        </Container>
    );
};

export default DevBoard;