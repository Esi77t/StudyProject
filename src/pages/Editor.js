import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CircularProgress, Container, Paper, Typography } from "@mui/material";
import api from "../api/api";
import PostForm from "../components/PostForm";

const Editor = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [postData, setPostData] = useState({ title: '', content: '' });
    const [loading, setLoading] = useState(true);
    // const editorRef = useRef();

    useEffect(() => {
        if (isEditMode) {
            const fetchPostForEdit = async () => {
                try {
                    const response = await api.get(`/api/posts/${id}`);
                    setPostData(response.data);
                } catch (error) {
                    alert("게시글 정보를 불러오는데 실패했습니다.");
                    navigate('/board');
                } finally {
                    setLoading(false);
                }
            };
            fetchPostForEdit();
        } else {
            setLoading(false);
        }
    }, [isEditMode, id, navigate]);

    // const handleFileDrop = async (file) => {
    //     const formData = new FormData();
    //     formData.append('image', file);
    //     try {
    //         const response = await api.post('/api/posts/image', formData, {
    //             headers: { 'Content-Type': 'multipart/form-data' },
    //         });
    //         const imageUrl = response.data;

    //         if (imageUrl && editorRef.current) {
    //             editorRef.current.chain().focus().setImage({ src: imageUrl }).run();
    //         }
    //     } catch (error) {
    //         console.error("이미지 업로드 실패:", error);
    //         alert("이미지 업로드에 실패했습니다.");
    //     }
    // }

    const handleSubmit = async (formData) => {
        try {
            if (isEditMode) {
                await api.put(`/api/posts/${id}`, formData);
                alert("게시글이 성공적으로 수정되었습니다.");
                navigate(`/board/${id}`);
            } else {
                const response = await api.post('/api/posts', formData);
                alert('게시글이 성공적으로 작성되었습니다.');
                navigate(`/board/${response.data.id}`);
            }
        } catch (error) {
            alert("게시글 처리에 실패했습니다. 로그인 상태를 확인해주세요.");
        }
    };

    if (loading) return <CircularProgress />;

    return (
        <Container maxWidth="lg" sx={{ my: 4 }}>
            <Paper elevation={0} sx={{ p: { xs: 2, sm: 4 } }}>
                <Typography variant="h4" component="h2" align="center" fontWeight={600} mb={4}>
                    {isEditMode ? '게시글 수정' : '새 게시글 작성'}
                </Typography>
                <PostForm
                    initialTitle={postData.title}
                    initialContent={postData.content}
                    onSubmit={handleSubmit}
                    isEditMode={isEditMode}
                />
            </Paper>
        </Container>
    );
}

export default Editor;