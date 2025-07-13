import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemText, MenuItem, Stack, Typography, Box, Menu, Button, ListItemSecondaryAction } from "@mui/material"
import { useState } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import api from "../api/api";

const CommentItem = ({ comment, isLast, isLoggedIn, currentUser, onDeleteSuccess }) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const isOwnComment = isLoggedIn && currentUser?.nickname === comment.author;

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        console.log("Edit comment:", comment.id);
        handleMenuClose();
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
        <ListItem
            alignItems="flex-start"
            divider={!isLast}
            secondaryAction={
                isOwnComment ? (
                    <IconButton edge="end" aria-label="settings" onClick={ handleMenuClick }>
                        <MoreVertIcon />
                    </IconButton>
                ) : null
            }
            sx={{ py: 2 }}
        >
            <ListItemAvatar>
                <Avatar alt={ comment.author } src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
                primary={
                    <Typography component="span" variant="body2" color="text.primary" fontWeight={600}>
                        { comment.author }
                    </Typography>
                }
                secondary={
                    <>
                        <Typography component="p" variant="body2" color="text.secondary" sx={{ mt: 0.5, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                            { comment.content }
                        </Typography>
                        <Typography component="span" variant="caption" color="text.secondary" sx={{ mt: 1, display: 'inline-block' }}>
                            { comment.date }
                        </Typography>
                    </>
                }
            />
            <Menu
                anchorEl={ anchorEl }
                open={ open }
                onClose={ handleMenuClose }
            >
                <MenuItem onClick={ handleEdit }>수정</MenuItem>
                <MenuItem onClick={ handleDelete }>삭제</MenuItem>
            </Menu>
        </ListItem>
    );
}

export default CommentItem;