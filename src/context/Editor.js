import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import "../css/Editor.css"

const Editor = ({ content, onUpdate }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Bold,
            Italic,
        ],
        content: content || "<p>Hello World! 🌍</p>", // 초기 콘텐츠 설정
        onUpdate: ({ editor }) => {
            const json = editor.getJSON();
            const html = editor.getHTML();
            console.log("Editor JSON:", json);
            console.log("Editor HTML:", html);

            if (onUpdate) {
                onUpdate(html); // 부모 컴포넌트로 HTML 콘텐츠를 전달
            }
        },
            editorProps: {
            attributes: {
                class: "tiptap-content-area",
            },
        },
    });

    if (!editor) {
        return null;
    }

    return (
        <div className="tiptap-editor-container">
            <div className="tiptap-toolbar">
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={editor.isActive("bold") ? "is-active" : ""}
                >
                Bold
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive("italic") ? "is-active" : ""}
                >
                Italic
                </button>
                <button
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    className={editor.isActive("paragraph") ? "is-active" : ""}
                >
                Paragraph
                </button>
                <button
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                >
                Undo
                </button>
                <button
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                >
                Redo
                </button>
            </div>
            <EditorContent editor={editor} />
        </div>
    );
};

export default Editor;