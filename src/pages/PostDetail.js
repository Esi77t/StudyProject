import { useNavigate, useParams } from "react-router-dom";
import { Container, Paper, Box, Typography, Button, Stack, Divider, Chip, List, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ListIcon from "@mui/icons-material/List";
import CommentItem from "../components/CommentItem";
import { useContext, useState } from "react";
import { DevBlogContext } from "../context/DevBlogProvider";

const dummyPosts = [
    {
        id: 1,
        title: "[게시글] 1번째 개발 블로그 게시글입니다.",
        author: "작성자A",
        date: "2025.01.05",
        views: 120,
        content: `
            <p>안녕하세요! 첫 번째 개발 블로그 게시글입니다.</p>
            <p>이곳에 게시글의 상세 내용이 들어갑니다. 여러 단락으로 구성될 수 있으며, 코드 블록이나 이미지 등 다양한 콘텐츠가 포함될 수 있습니다.</p>
            <pre><code>
            function helloWorld() {
                console.log("Hello, World!");
            }
            helloWorld();
                        </code></pre>
                        <p>이 페이지는 게시글 목록에서 특정 게시글을 클릭했을 때 보여지는 상세 페이지입니다. 라우팅을 통해 게시글 ID를 받아와 해당 ID에 맞는 게시글을 표시합니다.</p>
                        <p>오늘은 React 컴포넌트와 CSS를 사용하여 간단한 게시글 상세 페이지 레이아웃을 구성해 보았습니다. 다음 단계에서는 이 페이지에 댓글 기능이나 수정/삭제 기능을 추가할 수 있습니다.</p>
                        <p>읽어주셔서 감사합니다!</p>
        `
    },
    {
        id: 2,
        title: "[게시글] 2번째 React 개발 팁 공유합니다.",
        author: "작성자B",
        date: "2025.02.10",
        views: 250,
        content: `
            <p>React 개발 시 유용한 팁을 공유합니다.</p>
            <p>컴포넌트의 재사용성을 높이고, 상태 관리를 효율적으로 하는 방법에 대해 알아보겠습니다.</p>
            <h3>Hooks 사용의 중요성</h3>
            <ul>
                <li>useState: 함수 컴포넌트에서 상태를 관리합니다.</li>
                <li>useEffect: 사이드 이펙트를 처리합니다. (데이터 fetching, DOM 조작 등)</li>
                <li>useContext: 전역 상태를 쉽게 공유합니다.</li>
            </ul>
            <p>자세한 내용은 공식 문서를 참고해주세요.</p>
        `
    },
    {
        id: 3,
        title: "[게시글] 3번째 CSS Flexbox 완벽 가이드",
        author: "작성자C",
        date: "2025.03.15",
        views: 300,
        content: `
            <p>CSS Flexbox는 레이아웃을 유연하게 만드는 강력한 도구입니다.</p>
            <p>이 가이드에서는 Flexbox의 기본 개념부터 고급 활용법까지 다룹니다.</p>
            <h4>주요 속성:</h4>
            <ol>
                <li><code>display: flex;</code>: Flex 컨테이너를 만듭니다.</li>
                <li><code>flex-direction</code>: 주축의 방향을 설정합니다.</li>
                <li><code>justify-content</code>: 주축 방향으로 아이템을 정렬합니다.</li>
                <li><code>align-items</code>: 교차축 방향으로 아이템을 정렬합니다.</li>
            </ol>
            <p>Flexbox를 마스터하면 반응형 웹 디자인이 훨씬 쉬워집니다.</p>
        `
    },
];

const dummyComments = [
    { id: 1, postId: 1, author: "개발자C", content: "정리가 잘 되어 있네요. 잘 보고 갑니다!", date: "2025.01.05" },
    { id: 2, postId: 1, author: "신입B", content: "Flexbox 관련해서 궁금했는데 큰 도움이 되었습니다.", date: "2025.01.06" },
    { id: 3, postId: 2, author: "작성자A", content: "Hooks는 정말 혁신적인 기능이죠.", date: "2025.02.11" },
];

const PostDetail = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const postId = parseInt(id, 10);

    const { isLoggedIn } = useContext(DevBlogContext);

    const [comments, setComments] = useState(dummyComments.filter(c => c.postId === postId));
    const [newComment, setNewComment] = useState("");

    const post = dummyPosts.find(p => p.id === postId);

    const currentUser = {
        "name" : "개발자C",
    }

    const handleEditClick = () => {
        navigate(`/devboard/edit/${postId}`);
    };

     const handleCommentSubmit = () => {
        if (!newComment.trim()) return;
        const newId = comments.length > 0 ? Math.max(...comments.map(c => c.id)) + 1 : 1;
        const commentToAdd = {
            id: newId,
            postId: postId,
            author: "로그인유저", // 현재 로그인된 사용자 정보로 대체 필요
            content: newComment,
            date: new Date().toLocaleDateString('ko-KR'),
        };
        setComments([...comments, commentToAdd]);
        setNewComment("");
    };

    const handleDeleteClick = () => {
        if (window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
            console.log(`게시글 ID ${postId} 삭제 요청`);
            alert('게시글이 삭제되었습니다! (콘솔 확인)');
            navigate('/devboard');
        }
    };

    if (!post) {
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
            <Paper elevation={2} sx={{ p: { xs: 2, sm: 4 } }}>
                <Box sx={{ pb: 3, mb: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
                    <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, wordBreak: 'break-word' }}>
                        { post.title }
                    </Typography>
                    <Stack direction="row" spacing={2} sx={{ color: 'text.secondary', mt: 2 }}>
                        <Typography variant="body2">작성자: { post.author }</Typography>
                        <Typography variant="body2">작성일: { post.date }</Typography>
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
                        댓글: ({ comments.length }) 
                    </Typography>
                    <List sx={{ width: '100%', bgcolor: 'background.paper', p: 0 }}>
                        { comments.map((comment, index) => (
                            <CommentItem
                                key={ comment.id }
                                comment={ comment }
                                isLast={ index === comment.length - 1 }
                                isLoggedIn={ isLoggedIn }
                                currentUser={ currentUser }
                            />
                        )) }
                    </List>
                    <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                        <TextField
                            fullWidth
                            multiline
                            rows={2}
                            variant="outlined"
                            label="댓글을 입력하세요"
                            value={ newComment }
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