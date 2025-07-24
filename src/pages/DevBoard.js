import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, TextField, Box, Stack, CircularProgress, Button, MenuItem, Select, Paper, Accordion, AccordionSummary, AccordionDetails, Pagination } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CreateIcon from "@mui/icons-material/Create";
import CategorySidebar from "../components/CategorySidebar";
import PostTable from "../components/PostTable";
import { DevBlogContext } from "../context/DevBlogProvider";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useBoardData from "../hooks/useBoardData";

const DevBoard = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useContext(DevBlogContext);
    const {
        posts,
        categories,
        selectedCategoryId,
        loading,
        currentPage,
        totalPages,
        searchType,
        keyword,
        displayTitle,
        setSearchType,
        setKeyword,
        handleCategorySelect,
        handleSearch,
        handlePageChange
    } = useBoardData();

    const handleWrite = () => {
        if (!isLoggedIn) {
            alert("로그인이 필요합니다.");
            navigate("/login");
            return;
        }
        navigate('/board/write');
    };

    return (
        <Container maxWidth="lg" sx={{ my: 4 }}>
            <Paper elevation={0} sx={{ p: 4, border: '1px solid', borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: "column", md: 'row' }, alignItems: 'flex-start', gap: 4 }}>
                    <Box sx={{ width: { xs: '100%', md: '20%' }, flexShrink: 0 }}>
                        <Accordion defaultExpanded elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="h6" fontWeight={600}>카테고리</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ p: 0 }}>
                                <CategorySidebar
                                    categories={categories}
                                    selectedCategoryId={selectedCategoryId}
                                    onSelectCategory={handleCategorySelect}
                                />
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                    <Box sx={{ flexGrow: 1, width: '100%' }}>
                        <Stack spacing={3}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'flex-start', md: 'center' }, gap: { xs: 2, md: 0 } }}>
                                <Typography variant="h4" component="h2" fontWeight={600}>{displayTitle}</Typography>
                                <Stack direction="row" spacing={1} sx={{ width: { xs: '100%', md: 'auto' } }}>
                                    <Select size="small" value={searchType} onChange={(e) => setSearchType(e.target.value)} sx={{ flexGrow: 1 }}>
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
                                        InputProps={{ startAdornment: (<SearchIcon size="small" sx={{ mr: 1, color: 'text.secondary' }} />) }}
                                        sx={{ flexGrow: 2 }}
                                    />
                                    <Button variant="outlined" onClick={handleSearch}>검색</Button>
                                </Stack>
                            </Box>
                            {loading ? <CircularProgress /> : <PostTable posts={posts} />}
                            {posts.length > 0 && (
                                <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                                    <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" />
                                </Box>
                            )}
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button variant="contained" color="primary" startIcon={<CreateIcon />} onClick={handleWrite}>글쓰기</Button>
                            </Box>
                        </Stack>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default DevBoard;