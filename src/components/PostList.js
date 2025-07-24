import { Box, Chip, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"

const PostList = ({ posts }) => {

    const navigate = useNavigate();

    const handlePostClick = (postId) => {
        navigate(`/board/${postId}`)
    }

    return (
        <>
            <TableContainer component={Paper} elevation={0} sx={{ display: { xs: 'none', md: 'block' } }}>
                <Table stickyHeader aria-label="post list table" sx={{ tableLayout: 'fixed' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" sx={{ width: '10%' }}>번호</TableCell>
                            <TableCell align="left" sx={{ width: '50%' }}>글 제목</TableCell>
                            <TableCell align="center" sx={{ width: '15%' }}>작성자</TableCell>
                            <TableCell align="center" sx={{ width: '10%' }}>조회수</TableCell>
                            <TableCell align="center" sx={{ width: '15%' }}>카테고리</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {posts.length > 0 ? (
                            posts.map((post) => (
                                <TableRow key={post.id} hover onClick={() => handlePostClick(post.id)} sx={{ cursor: 'pointer' }}>
                                    <TableCell align="center">{post.id}</TableCell>
                                    <TableCell align="left" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{post.title}</TableCell>
                                    <TableCell align="center">{post.author}</TableCell>
                                    <TableCell align="center">{post.views}</TableCell>
                                    <TableCell align="center">{post.categoryName}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} align="center" sx={{ py: 10 }}>
                                    게시글이 없습니다.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                {posts.map((post) => (
                    <Paper
                        key={post.id}
                        variant="outlined"
                        sx={{ p: 2, mb: 1.5, cursor: 'pointer' }}
                        onClick={() => handlePostClick(post.id)}
                    >
                        <Stack spacing={1}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
                                <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {post.title}
                                </Typography>
                                <Chip label={post.categoryName || '미분류'} size="small" sx={{ flexShrink: 0 }} />
                            </Stack>
                            <Stack direction="row" spacing={2} sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
                                <span>{post.author}</span>
                                <span>조회수 {post.views}</span>
                            </Stack>
                        </Stack>
                    </Paper>
                ))}
            </Box>
        </>
    )
}

export default PostList;