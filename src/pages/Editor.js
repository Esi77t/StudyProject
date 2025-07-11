import { EditorContent, useEditor, } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import { Container, Paper, Box, Typography, TextField, Button, Stack, ToggleButton, Divider, } from "@mui/material";
import { FormatBold, FormatItalic, FormatListBulleted, FormatListNumbered, Code, Image as ImageIcon, Link as LinkIcon, LinkOff, TableChart, Delete, Undo, Redo } from '@mui/icons-material';
import { DevBlogContext } from "../context/DevBlogProvider";
import History from "@tiptap/extension-history";

const dummyPosts = [
    {
        id: 1,
        title: "[게시글] 1번째 개발 블로그 게시글입니다.",
        content: `<p>안녕하세요! 첫 번째 개발 블로그 게시글입니다.</p><p>이곳에 게시글의 상세 내용이 들어갑니다.</p>`
    },
    {
        id: 2,
        title: "[게시글] 2번째 React 개발 팁 공유합니다.",
        content: `<p>React 개발 시 유용한 팁을 공유합니다.</p><p>컴포넌트의 재사용성을 높이고, 상태 관리를 효율적으로 하는 방법에 대해 알아보겠습니다.</p>`
    }
];

const Editor = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;
    const postId = isEditMode ? parseInt(id, 10) : null;
    const { isDarkMode } = useContext(DevBlogContext);

    const [title, setTitle] = useState('');
    const [initialContent, setInitialContent] = useState('');

    const editor = useEditor({
        extensions: [
            StarterKit.configure({ history: false }),
            History,
            Image.configure({
                inline: true,
                allowBase64: true,
            }),
            Link.configure({
                openOnClick: false,
                autolink: true,
            }),
            Table.configure({
                resizable: true,
            }),
            TableRow,
            TableHeader,
            TableCell,
        ],
        content: initialContent,
        editorProps: {
            attributes: {
                class: 'tiptap-editor-content',
            },
        },
    });

    useEffect(() => {
        if (isEditMode && postId) {
            const postToEdit = dummyPosts.find(p => p.id === postId);
            if (postToEdit) {
                setTitle(postToEdit.title);
                setInitialContent(postToEdit.content);
                if (editor) {
                    editor.commands.setContent(postToEdit.content);
                }
            } else {
                alert('수정할 게시글을 찾을 수 없습니다.');
                navigate('/devboard');
            }
        }
    }, [isEditMode, postId, navigate, editor]);

    const addImage = () => {
        const url = window.prompt('이미지 URL을 입력하세요:');
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    const setLink = () => {
        const url = window.prompt('링크 URL을 입력하세요:', editor.getAttributes('link').href);
        if (url === null) return;
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    };

    if (!editor) {
        return null;
    }

    const handleSubmit = () => {
        const htmlContent = editor.getHTML();
        const textContent = editor.getText();

        if (!title.trim()) {
            alert('제목을 입력해주세요.');
            return;
        }
        if (!htmlContent.trim() || textContent.trim() === '') {
            alert('내용을 입력해주세요.');
            return;
        }

        if (isEditMode) {
            console.log('게시글 수정:', { id: postId, title, content: htmlContent });
            alert('게시글이 수정되었습니다! (콘솔 확인)');
        } else {
            console.log('새 게시글 작성:', { title, content: htmlContent });
            alert('게시글이 작성되었습니다! (콘솔 확인)');
        }
        navigate('/devboard');
    };

    const handleCancel = () => {
        if (window.confirm('작성을 취소하시겠습니까? 작성 중인 내용은 저장되지 않습니다.')) {
            navigate('/devboard');
        }
    };

    return(
        <Container maxWidth="lg" sx={{ my: 4 }}>
            <Paper elevation={ 2 } sx={{ p: 4 }}>
                <Typography variant="h4" component="h2" align="center" fontWeight={ 600 } mb={ 4 }>
                    { isEditMode ? '게시글 수정' : '새 게시글 작성' }
                </Typography>
                <Stack spacing={ 4 }>
                    <TextField
                        fullWidth
                        label="제목"
                        variant="standard"
                        value={ title }
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="게시글 제목을 입력하세요"
                        InputLabelProps={{ sx: { fontSize: '16x' } }}
                    />
                    <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 8, }}>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', p: 1, borderColor: 'divider', borderWidth: '100%', '& .MuiToggleButton-root': { border: 0, borderRadius: 1, fontWeight: 'bold', '&.Mui-disabled': { border: 0 }} }}>
                            <ToggleButton value="h1" size="small" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} selected={editor.isActive('heading', { level: 1 })} sx={{ border: 0, borderRadius: 1, fontWeight: 'bold', '&.Mui-disabled': { border: 0, }, }}>H1</ToggleButton>
                            <ToggleButton value="h2" size="small" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} selected={editor.isActive('heading', { level: 2 })} sx={{ border: 0, borderRadius: 1, fontWeight: 'bold', '&.Mui-disabled': { border: 0, }, }}>H2</ToggleButton>
                            <ToggleButton value="p" size="small" onClick={() => editor.chain().focus().setParagraph().run()} selected={editor.isActive('paragraph')} sx={{ border: 0, borderRadius: 1, fontWeight: 'bold', '&.Mui-disabled': { border: 0, }, }}>P</ToggleButton>
                            <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
                            <ToggleButton size="small" value="undo" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} sx={{ border: 0, borderRadius: 1, fontWeight: 'bold', '&.Mui-disabled': { border: 0, }, }}>
                                <Undo />
                            </ToggleButton>
                            <ToggleButton size="small" value="redo" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} sx={{ border: 0, borderRadius: 1, fontWeight: 'bold', '&.Mui-disabled': { border: 0, }, }}>
                                <Redo />
                            </ToggleButton>
                            <Divider flexItem orientation="vertical" sx={{ mx: 0.5 }} />
                            <ToggleButton size="small" value="bold" onClick={() => editor.chain().focus().toggleBold().run()} selected={ editor.isActive('bold') } sx={{ border: 0, borderRadius: 1, fontWeight: 'bold', '&.Mui-disabled': { border: 0, }, }}><FormatBold /></ToggleButton>
                            <ToggleButton size="small" value="italic" onClick={() => editor.chain().focus().toggleItalic().run()} selected={ editor.isActive('italic') } sx={{ border: 0, borderRadius: 1, fontWeight: 'bold', '&.Mui-disabled': { border: 0, }, }}><FormatItalic /></ToggleButton>
                            <ToggleButton size="small" value="bulletList" onClick={() => editor.chain().focus().toggleBulletList().run()} selected={ editor.isActive('bulletList') } sx={{ border: 0, borderRadius: 1, fontWeight: 'bold', '&.Mui-disabled': { border: 0, }, }}><FormatListBulleted /></ToggleButton>
                            <ToggleButton size="small" value="orderedList" onClick={() => editor.chain().focus().toggleOrderedList().run()} selected={ editor.isActive('orderedList') } sx={{ border: 0, borderRadius: 1, fontWeight: 'bold', '&.Mui-disabled': { border: 0, }, }}><FormatListNumbered /></ToggleButton>
                            <ToggleButton size="small" value="codeBlock" onClick={() => editor.chain().focus().toggleCodeBlock().run()} selected={ editor.isActive('codeBlock') } sx={{ border: 0, borderRadius: 1, fontWeight: 'bold', '&.Mui-disabled': { border: 0, }, }}><Code /></ToggleButton>
                            <Divider flexItem orientation="vertical" sx={{ mx: 0.5 }} />
                            <ToggleButton size="small" value="image" onClick={ addImage } sx={{ border: 0, borderRadius: 1, fontWeight: 'bold', '&.Mui-disabled': { border: 0, }, }}><ImageIcon /></ToggleButton>
                            <ToggleButton size="small" value="link" onClick={ setLink } selected={editor.isActive('link')} sx={{ border: 0, borderRadius: 1, fontWeight: 'bold' }}><LinkIcon /></ToggleButton>
                            <ToggleButton size="small" value="unlink" onClick={() => editor.chain().focus().unsetLink().run()} disabled={ !editor.isActive('link') } sx={{ border: 0, borderRadius: 1, fontWeight: 'bold', '&.Mui-disabled': { border: 0, }, }}><LinkOff /></ToggleButton>
                            <Divider flexItem orientation="vertical" sx={{ mx: 0.5 }} />
                            <ToggleButton size="small" value="table" onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} sx={{ border: 0, borderRadius: 1, fontWeight: 'bold', '&.Mui-disabled': { border: 0, }, }}><TableChart /></ToggleButton>
                            <ToggleButton size="small" value="deleteTable" onClick={() => editor.chain().focus().deleteTable().run()} disabled={ !editor.isActive('table') } sx={{ border: 0, borderRadius: 1, fontWeight: 'bold', '&.Mui-disabled': { border: 0, }, }}><Delete /></ToggleButton>
                        </Box>
                    </Box>
                    <Box sx={{ px: 1, minHeight: 400, '& .tiptap': { outline: 'none' }, '& .tiptap p': { margin: 0 }, borderBottom: '2px solid', borderRadius: '0 0 4px 4px', borderColor: 'divider' }}>
                        <EditorContent editor={ editor } />
                    </Box>
                    <Stack direction="row" spacing={ 2 } justifyContent="flex-end">
                        <Button
                            variant="outlined"
                            onClick={ handleCancel }
                            sx={{
                                py: '10px', px: '20px',
                                color: isDarkMode ? 'grey.400' : 'grey.700',
                                borderColor: isDarkMode ? 'grey.700' : 'grey.400',
                            }}
                        >
                            취소
                        </Button>
                        <Button
                            variant="contained"
                            onClick={ handleSubmit }
                            sx={{
                                py: '10px', px: '20px',
                                backgroundColor: isDarkMode ? '#eee' : 'grey.800',
                                color: isDarkMode ? '#333' : 'grey.300',
                                '&:hover': {
                                    backgroundColor: isDarkMode ? '#ddd' : 'grey.700',
                                }
                            }}
                        >
                            { isEditMode ? '수정 완료' : '작성 완료' }
                        </Button>
                    </Stack>
                </Stack>
            </Paper>
        </Container>
    );
}

export default Editor;