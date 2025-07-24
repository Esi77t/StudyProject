import { FormatBold, FormatItalic, FormatListBulleted, FormatListNumbered, Code, Image as ImageIcon, Link as LinkIcon, LinkOff, TableChart, Delete, Undo, Redo } from "@mui/icons-material";
import { Box, Divider, ToggleButton } from "@mui/material";

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
                mx: { xs: 0.2, md: 0 },
                my: { xs: 0.5, md: 0 },
                '&.Mui-disabled': {
                    border: 'none',
                },
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

export default MenuBar;