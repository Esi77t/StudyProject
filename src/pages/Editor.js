import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import "../css/Editor.css"
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import { MdAdd, MdCode, MdDelete, MdFormatBold, MdFormatItalic, MdFormatListBulleted, MdFormatListNumbered, MdImage, MdLink, MdLinkOff, MdRemove, MdTableChart } from "react-icons/md";

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

    const [title, setTitle] = useState('');
    const [initialContent, setInitialContent] = useState('');

    const editor = useEditor({
        extensions: [
            StarterKit,
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
        onUpdate: ({ editor }) => {
            // const html = editor.getHTML();
            // console.log(html);
        },
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

    // ★★★ 새로운 기능 함수들 ★★★
    const addImage = () => {
        const url = window.prompt('이미지 URL을 입력하세요:'); // 이미지 URL 입력
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    const setLink = () => {
        const url = window.prompt('링크 URL을 입력하세요:', editor.getAttributes('link').href);
        if (url === null) return; // 프롬프트 취소 시
        if (url === '') { // URL이 비어있으면 링크 제거
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    };

    const unsetLink = () => {
        editor.chain().focus().unsetLink().run();
    };

    const addTable = () => {
        editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
    };

    const deleteTable = () => {
        editor.chain().focus().deleteTable().run();
    };

    const addRowAfter = () => {
        editor.chain().focus().addRowAfter().run();
    };

    const deleteRow = () => {
        editor.chain().focus().deleteRow().run();
    };

    const addColumnAfter = () => {
        editor.chain().focus().addColumnAfter().run();
    };

    const deleteColumn = () => {
        editor.chain().focus().deleteColumn().run();
    };


    // 에디터가 아직 로드되지 않았을 때
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

    return (
        <div className="editor-container">
            <h2 className="editor-page-title">{isEditMode ? '게시글 수정' : '새 게시글 작성'}</h2>
            <div className="form-group">
                <label htmlFor="post-title">제목</label>
                <input
                    type="text"
                    id="post-title"
                    className="title-input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="게시글 제목을 입력하세요"
                />
            </div>

            <div className="form-group">
                <label>내용</label>
                <div className="tiptap-toolbar">
                    <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'is-active' : ''}>
                        <MdFormatBold />
                    </button>
                    <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'is-active' : ''}>
                        <MdFormatItalic />
                    </button>
                    <button onClick={() => editor.chain().focus().setParagraph().run()} className={editor.isActive('paragraph') ? 'is-active' : ''}>
                        P 
                    </button>
                    <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'is-active' : ''}>
                        <MdFormatListBulleted />
                    </button>
                    <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? 'is-active' : ''}>
                        <MdFormatListNumbered />
                    </button>
                    <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={editor.isActive('codeBlock') ? 'is-active' : ''}>
                        <MdCode />
                    </button>
                    <button onClick={addImage}>
                        <MdImage />
                    </button>
                    <button onClick={setLink} className={editor.isActive('link') ? 'is-active' : ''}>
                        <MdLink />
                    </button>
                    <button onClick={unsetLink} disabled={!editor.isActive('link')}>
                        <MdLinkOff />
                    </button>
                    <button onClick={addTable}>
                        <MdTableChart />
                    </button>
                    <button onClick={addRowAfter} disabled={!editor.isActive('table')}>
                        <MdAdd /> 행 
                    </button>
                    <button onClick={deleteRow} disabled={!editor.isActive('table')}>
                        <MdRemove /> 행 
                    </button>
                    <button onClick={addColumnAfter} disabled={!editor.isActive('table')}>
                        <MdAdd /> 열 
                    </button>
                    <button onClick={deleteColumn} disabled={!editor.isActive('table')}>
                        <MdRemove /> 열 
                    </button>
                    <button onClick={deleteTable} disabled={!editor.isActive('table')}>
                        <MdDelete /> 표 
                    </button>
                </div>
                <EditorContent editor={editor} className="tiptap-editor-wrapper" />
            </div>

            <div className="editor-actions">
                <button onClick={handleSubmit} className="submit-button">
                    { isEditMode ? '수정 완료' : '작성 완료' }
                </button>
                <button onClick={handleCancel} className="cancel-button">
                    취소
                </button>
            </div>
        </div>
    );
};

export default Editor;