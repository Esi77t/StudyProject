import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemText, MenuItem, Stack, Typography, Box, Menu, Button, ListItemSecondaryAction, TextField } from "@mui/material"
import { useState } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import api from "../api/api";

const CommentItem = ({ comment, isLast, isLoggedIn, currentUser, onDeleteSuccess, onUpdateSuccess, isDarkMode }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(comment.content);

    const isOwnComment = isLoggedIn && currentUser?.nickname === comment.author;

    const handleUpdate = async () => {
        if (!editedContent.trim()) {
            alert("수정할 내용을 입력해주세요.");
            return;
        }
        try {
            const response = await api.put(`/api/comments/${comment.id}`, {
                content: editedContent
            });
            onUpdateSuccess(response.data); // 부모에게 수정된 댓글 데이터 전달
            setIsEditing(false); // 수정 모드 종료
            alert("댓글이 수정되었습니다.");
        } catch (error) {
            console.error("댓글 수정 실패:", error);
            alert("댓글 수정에 실패했습니다.");
        }
    };

    const handleDelete = async () => {
        if(window.confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
            try {
                await api.delete(`/api/comments/${ comment.id }`);

                onDeleteSuccess(comment.id);

                alert("댓글이 삭제되었습니다.");
            } catch (error) {
                console.error("댓글 삭제 실패: ", error);
                alert("댓글 삭제에 실패했습니다.");
            }
        }
    };

    return(
        <ListItem alignItems="flex-start" divider={!isLast} sx={{ py: 2, flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', width: '100%', mb: 1 }}>
                <ListItemAvatar sx={{ mt: 0.5 }}>
                    <Avatar alt={comment.author} src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <Typography component="span" variant="body2" color="text.primary" fontWeight={600}>
                            { comment.author }
                        </Typography>
                    }
                    secondary={
                        isEditing ? (
                            <TextField
                                fullWidth
                                multiline
                                variant="outlined"
                                value={editedContent}
                                onChange={(e) => setEditedContent(e.target.value)}
                                sx={{ mt: 1 }}
                            />
                        ) : (
                            <Typography component="p" variant="body2" color="text.primary" sx={{ mt: 1, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                                { comment.content }
                            </Typography>
                        )
                    }
                />
            </Box>
            { isOwnComment && (
                <Stack direction="row" spacing={ 1 } sx={{ alignSelf: 'flex-end' }}>
                    {isEditing ? (
                        <>
                            <Button size="small"  variant="contained" onClick={ handleUpdate }>저장</Button>
                            <Button size="small" onClick={ () => setIsEditing(false) }>취소</Button>
                        </>
                    ) : (
                        <>
                            <Button size="small" onClick={ () => setIsEditing(true) } sx={(theme) => ({
                                backgroundColor: theme.palette.mode === 'dark' ? 'grey.700' : 'grey.200',
                                color: 'text.primary',
                                '&:hover': {
                                    backgroundColor: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.300',
                                }
                            })}>수정</Button>
                            <Button size="small" color="error" onClick={ handleDelete } sx={{
                                    backgroundColor: '#d32f2f', // 에러 색상
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: '#c62828',
                                    }
                            }}>삭제</Button>
                        </>
                    )}
                </Stack>
            )}
        </ListItem>
    );
}

export default CommentItem;