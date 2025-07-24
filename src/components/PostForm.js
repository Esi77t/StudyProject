import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
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
import MenuBar from "./MenuBar";
// import "../css/PostForm.css";

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
                        minHeight: { xs: '60vh', md: 400 },
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