import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import "../css/Editor.css"
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

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

    // TipTap 에디터 설정
    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content: initialContent,
        onUpdate: ({ editor }) => {

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
                    <button onClick={() => editor.chain().focus().toggleBold().run()} className={ editor.isActive('bold') ? 'is-active' : '' }>
                        Bold
                    </button>
                    <button onClick={() => editor.chain().focus().toggleItalic().run()} className={ editor.isActive('italic') ? 'is-active' : '' }>
                        Italic
                    </button>
                    <button onClick={() => editor.chain().focus().setParagraph().run()} className={ editor.isActive('paragraph') ? 'is-active' : '' }>
                        Paragraph
                    </button>
                    <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={ editor.isActive('bulletList') ? 'is-active' : '' }>
                        Bullet List
                    </button>
                    <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={ editor.isActive('orderedList') ? 'is-active' : '' }>
                        Ordered List
                    </button>
                    <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={ editor.isActive('codeBlock') ? 'is-active' : '' }>
                        Code Block
                    </button>
                </div>
                <EditorContent editor={ editor } className="tiptap-editor-wrapper" />
            </div>

            <div className="editor-actions">
                <button onClick={ handleSubmit } className="submit-button">
                    {isEditMode ? '수정 완료' : '작성 완료'}
                </button>
                <button onClick={ handleCancel } className="cancel-button">
                    취소
                </button>
            </div>
        </div>
    );
};

export default Editor;