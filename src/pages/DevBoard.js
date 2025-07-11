import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Paper, Typography, TextField, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Fab, Box, useScrollTrigger, Zoom } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";

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
        <Container maxWidth="lg" sx={{ my: 4 }}>
            <Paper elevation={ 0 } sx={{ p: 4, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3, mb: 3 }}>
                    <Typography variant="h4" component="h2" fontWeight={ 600 }>
                        Dev 게시판
                    </Typography>
                    <Box>
                        <TextField
                            size="small"
                            variant="outlined"
                            placeholder="검색어를 입력하세요."
                            InputProps={{
                                endAdornment: (
                                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                        <SearchIcon />
                                    </IconButton>
                                ),
                            }}
                        />
                    </Box>
                </Box>
                <TableContainer sx={{ mb: 8 }}>
                    <Table stickyHeader aria-label="post list table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" sx={{ width: '10%' }}>번호</TableCell>
                                <TableCell align="left">글 제목</TableCell>
                                <TableCell align="center" sx={{ width: '15%' }}>작성자</TableCell>
                                <TableCell align="center" sx={{ width: '10%' }}>조회수</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentPosts.length > 0 ? (
                                currentPosts.map((post) => (
                                    <TableRow key={ post.id } hover onClick={() => handlePostClick(post.id)} sx={{ cursor: 'pointer' }}>
                                        <TableCell align="center">{ post.id }</TableCell>
                                        <TableCell align="left">{ post.title }</TableCell>
                                        <TableCell align="center">{ post.author }</TableCell>
                                        <TableCell align="center">{ post.views }</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={ 4 } align="center" sx={{ py: 10 }}>
                                        게시글이 없습니다.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', }}>
                <Fab
                    color="primary"
                    aria-label="write post"
                    onClick={ handleWriteClick }
                    sx={{
                        position: 'fixed',
                        bottom: 58,
                        right: 400,
                    }}
                >
                <EditIcon />
                </Fab>
            </Box>
        </Container>
    );
};

export default DevBoard;