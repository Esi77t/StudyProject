import { useNavigate, useParams } from "react-router-dom";
import { Container, Paper, Box, Typography, Button, Stack, Divider, Chip, List, TextField, CircularProgress } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ListIcon from "@mui/icons-material/List";
import { useContext, useEffect, useState } from "react";
import api from "../api/api";
import CommentItem from "../components/CommentItem";
import { DevBlogContext } from "../context/DevBlogProvider";

const PostDetail = () => {

    const { id } = useParams();
    const { isLoggedIn, user } = useContext(DevBlogContext);
    const navigate = useNavigate();
    
    const [post, setPost] = useState();
    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            try {
                const postResponse = await api.get(`/api/posts/${ id }`);
                setPost(postResponse.data);

                const commentsResponse = await api.get(`/api/posts/${ id }/comments`);
                setComments(commentsResponse.data);
            } catch (error) {
                console.error("게시글을 불러오는데 실패했습니다.", error);
                setPost(null);
                setComments([]);
            } finally {
                setLoading(false);
            }
        }

        fetchPost();
    }, [id]);

    const handleEditClick = () => {
        navigate(`/devboard/edit/${ id }`);
    };

    const handleDeleteClick = async () => {
        if (window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
            try {
                await api.delete(`/api/posts/${ id }`);
                alert('게시글이 성공적으로 삭제되었습니다.');
                navigate('/devboard');
            } catch (error) {
                console.error("게시글 삭제 실패: ", error);
                alert("게시글 삭제에 실패했습니다.");
            }
        }
    }

    const handleCommentSubmit = async () => {
        if(!newComment.trim()) {
            alert("댓글 내용을 입력해주세요");
            return;
        }

        try {
            const response = await api.post(`/api/posts/${ id }/comments`, {
                content: newComment
            });

            setComments([...comments, response.data]);

            setNewComment("");
        } catch (error) {
            console.error("댓글 작성 실패: ", error);
            alert("댓글 작성에 실패했습니다. 로그인 상태를 확인해주세요.");
        }
    }

    const handleCommentDeleted = (deletedCommentId) => {
        setComments(comments.filter(comment => comment.id !== deletedCommentId));
    }

    if(loading) {
        return(
            <Container maxWidth="md" sx={{ my: 4, display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Container>
        )
    }

    if(!post) {
        return (
            <Container maxWidth="md" sx={{ my: 4 }}>
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>게시글을 찾을 수 없습니다.</Typography>
                    <Button variant="outlined" onClick={() => navigate('/devboard')} startIcon={<ListIcon />}>
                        목록으로
                    </Button>
                </Paper>
            </Container>
        );
    }

    return(
        <Container maxWidth="md" sx={{ my: 4 }}>
            <Paper elevation={ 2 } sx={{ p: { xs: 2, sm: 4 } }}>
                <Box sx={{ pb: 3, mb: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
                    <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, wordBreak: 'break-word' }}>
                        { post.title }
                    </Typography>
                    <Stack direction="row" spacing={2} sx={{ color: 'text.secondary', mt: 2 }}>
                        <Typography variant="body2">작성자: { post.author }</Typography>
                        <Typography variant="body2">작성일: { new Date(post.createdAt).toLocaleDateString('ko-KR') }</Typography>
                        <Typography variant="body2">조회수: { post.views }</Typography>
                    </Stack>
                </Box>
                <Box
                    className="post-content-area"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                    sx={{
                        py: 2,
                        lineHeight: 1.8,
                        fontSize: '1rem',
                        '& h1, & h2, & h3, & h4': {
                            mt: 4,
                            mb: 2,
                            fontWeight: 600,
                        },
                        '& p': {
                            my: 1.5,
                        },
                        '& ul, & ol': {
                            pl: 3,
                        },
                        '& pre': {
                            p: 2,
                            my: 2,
                            backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'grey.900' : 'grey.100',
                            borderRadius: 1,
                            overflowX: 'auto',
                        },
                        '& code': {
                            fontFamily: 'monospace',
                        },
                    }}
                />
                <Divider sx={{ my: 3 }} />
                <Stack direction="row" spacing={ 2 } justifyContent="flex-end">
                    <Button variant="outlined" color="secondary" onClick={ handleEditClick } startIcon={ <EditIcon /> }>
                        수정
                    </Button>
                    <Button variant="outlined" color="error" onClick={ handleDeleteClick } startIcon={ <DeleteIcon /> }>
                        삭제
                    </Button>
                    <Button variant="contained" onClick={() => navigate('/devboard')} startIcon={ <ListIcon /> }>
                        목록으로
                    </Button>
                </Stack>
                <Box sx={{ mt: 5 }}>
                    <Typography variant="h6" gutterBottom>
                        댓글 ({ comments.length })
                    </Typography>
                    <List sx={{ width: '100%', bgcolor: 'background.paper', p: 0 }}>
                        { comments.map((comment, index) => (
                            <CommentItem
                                key={ comment.id }
                                comment={ comment }
                                isLast={ index === comments.length - 1 }
                                isLoggedIn={ isLoggedIn }
                                currentUser={ user }
                                onDeleteSuccess={ handleCommentDeleted }
                            />
                        ))}
                    </List>
                    <Stack direction="row" spacing={ 2 } sx={{ mt: 3 }}>
                        <TextField
                            fullWidth
                            multiline
                            rows={ 2 }
                            variant="outlined"
                            label="댓글을 입력하세요"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <Button variant="contained" onClick={ handleCommentSubmit } sx={{ height: 'fit-content', alignSelf: 'flex-end' }}>
                            등록
                        </Button>
                    </Stack>
                </Box>
            </Paper>
        </Container>
    );
}

export default PostDetail;