import { FormatBold, FormatItalic, FormatListBulleted, FormatListNumbered, Code, Image as ImageIcon, Link as LinkIcon, LinkOff, TableChart, Delete, Undo, Redo } from "@mui/icons-material";
import { Box, Button, Divider, FormControl, InputLabel, MenuItem, Select, Stack, TextField, ToggleButton } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import api from "../api/api";
import History from "@tiptap/extension-history";
// import "../css/PostForm.css";

const MenuBar = ({ editor, onImageClick, onLinkClick }) => {
    if (!editor) return null;
    return (
        <Box sx={{
            display: 'flex', 
            flexWrap: 'wrap', 
            alignItems: 'center', 
            p: 1,
            borderBottom: '1px solid', 
            borderColor: 'divider',
            justifyContent: { xs: 'flex-start', md: 'center' },
            '& .MuiToggleButton-root': {
                border: 'none',
                borderRadius: 1,
                fontWeight: 'bold',
                '& .Mui-selected': {
                    color: 'primary.main',
                    backgroundColor: 'action.selected'
                }
            },
            '& .MuiDivider-root': {
                mx: 0.5,
                my: 1,
            }
        }}>
            <ToggleButton value="h1" size="small" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} selected={editor.isActive('heading', { level: 1 })}>H1</ToggleButton>
            <ToggleButton value="h2" size="small" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} selected={editor.isActive('heading', { level: 2 })}>H2</ToggleButton>
            <ToggleButton value="p" size="small" onClick={() => editor.chain().focus().setParagraph().run()} selected={editor.isActive('paragraph')} >P</ToggleButton>
            <Divider flexItem orientation="vertical"/>
            <ToggleButton size="small" value="undo" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
                <Undo />
            </ToggleButton>
            <ToggleButton size="small" value="redo" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
                <Redo />
            </ToggleButton>
            <Divider flexItem orientation="vertical" sx={{ mx: 0.5 }} />
            <ToggleButton size="small" value="bold" onClick={() => editor.chain().focus().toggleBold().run()} selected={editor.isActive('bold')}><FormatBold /></ToggleButton>
            <ToggleButton size="small" value="italic" onClick={() => editor.chain().focus().toggleItalic().run()} selected={editor.isActive('italic')}><FormatItalic /></ToggleButton>
            <ToggleButton size="small" value="bulletList" onClick={() => editor.chain().focus().toggleBulletList().run()} selected={editor.isActive('bulletList')}><FormatListBulleted /></ToggleButton>
            <ToggleButton size="small" value="orderedList" onClick={() => editor.chain().focus().toggleOrderedList().run()} selected={editor.isActive('orderedList')}><FormatListNumbered /></ToggleButton>
            <ToggleButton size="small" value="codeBlock" onClick={() => editor.chain().focus().toggleCodeBlock().run()} selected={editor.isActive('codeBlock')}><Code /></ToggleButton>
            <Divider flexItem orientation="vertical" sx={{ mx: 0.5 }} />
            <ToggleButton size="small" value="image" onClick={onImageClick}><ImageIcon /></ToggleButton>
            <ToggleButton size="small" value="link" onClick={onLinkClick} selected={editor.isActive('link')}><LinkIcon /></ToggleButton>
            <ToggleButton size="small" value="unlink" onClick={() => editor.chain().focus().unsetLink().run()} disabled={!editor.isActive('link')}><LinkOff /></ToggleButton>
            <Divider flexItem orientation="vertical" sx={{ mx: 0.5 }} />
            <ToggleButton size="small" value="table" onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}><TableChart /></ToggleButton>
            <ToggleButton size="small" value="deleteTable" onClick={() => editor.chain().focus().deleteTable().run()} disabled={!editor.isActive('table')}><Delete /></ToggleButton>
        </Box>
    )
}

const PostForm = ({ initialTitle = '', initialContent = '', onSubmit, isEditMode = false, initialCategoryId = '', }) => {

    const [title, setTitle] = useState(initialTitle);
    const fileInput = useRef(null);

    const [attachments, setAttachments] = useState([]);

    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(initialCategoryId);

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
            handleDrop: function (view, event, slice, moved) {
                if (event.dataTransfer?.files?.length > 0) {
                    event.preventDefault();
                    uploadImageToServer(event.dataTransfer.files[0]);
                    return true;
                }
                return;
            }
        },
    });

    const uploadImageToServer = async (file) => {
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await api.post('/api/attachments/temp', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            const newAttachment = response.data; // {id, originalFileName, s3Url}

            setAttachments(prev => [...prev, newAttachment]);

            if (newAttachment.s3Url && editor) {
                editor.chain().focus().setImage({ src: newAttachment.s3Url }).run();
            }
        } catch (error) {
            console.error("이미지 업로드 실패:", error);
            alert("이미지 업로드에 실패했습니다.");
        }
    };

    const handleImageButtonClick = () => {
        fileInput.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        uploadImageToServer(file);
    };

    const setLink = useCallback(() => {

        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);

        if (url === null || url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }, [editor]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get('/api/categories');
                setCategories(response.data);
            } catch (error) {
                console.error("카테고리 로딩 실패:", error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        if (editor) {
            if (editor.getHTML() !== initialContent) {
                editor.commands.setContent(initialContent);
            }
            setTitle(initialTitle);
        }
    }, [initialContent, initialTitle, editor]);

    const handleSubmit = () => {
        if (!title.trim() || editor.isEmpty) {
            alert("제목과 내용을 모두 입력해주세요.");
            return;
        }

        const attachmentIds = attachments.map(att => att.id);

        onSubmit({
            title,
            content: editor.getHTML(),
            categoryId: selectedCategoryId,
            attachmentIds: attachmentIds,
        });
    };

    return (
        <Stack spacing={4} >
            <input type="file" ref={fileInput} onChange={handleFileChange} style={{ display: 'none' }} accept="image/*" />
            <TextField
                fullWidth
                label="제목"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <FormControl fullWidth variant="outlined">
                <InputLabel id="category-select-label">카테고리</InputLabel>
                <Select
                    labelId="category-select-label"
                    value={selectedCategoryId}
                    label="카테고리"
                    onChange={(e) => setSelectedCategoryId(e.target.value)}
                >
                    {categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                            {category.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                <MenuBar
                    editor={editor}
                    onImageClick={handleImageButtonClick}
                    onLinkClick={setLink}
                />
                <Box
                    onClick={() => editor.chain().focus().run()}
                    sx={{
                        p: 2,
                        minHeight: 400,
                        cursor: 'text',
                        '& .tiptap': { outline: 'none' },
                    }}
                >
                    <EditorContent editor={editor} />
                </Box>
            </Box>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button variant="outlined" color="error">취소</Button>
                <Button variant="contained" onClick={handleSubmit} disabled={selectedCategoryId === '' || !title.trim() || editor.isEmpty}>
                    {isEditMode ? '수정 완료' : '작성 완료'}
                </Button>
            </Stack>
        </Stack>
    )
}

export default PostForm;