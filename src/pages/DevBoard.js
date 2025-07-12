import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Paper, Typography, TextField, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Fab, Box, useScrollTrigger, Zoom } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import api from "../api/api";

const DevBoard = () => {
    
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await api.get('/api/posts');
                setPosts(response.data);
            } catch (error) {
                console.error("게시글 목록을 불러오는데 실패했습니다.", error);
            }
        }

        fetchPosts();
    }, [])
    
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
                            { posts.length > 0 ? (
                                posts.map((post) => (
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