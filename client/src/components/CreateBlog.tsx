import {DraftHandleValue, Editor, EditorState, RichUtils} from 'draft-js';
import 'draft-js/dist/Draft.css'
import {useState} from 'react';
//TODO: Complete implementation of Drafts. There should be a save and submit button.
const CreateBlog = () => {
    const [editorContent, setEditorContent] = useState(() => EditorState.createEmpty())
    const handleSpecialInput = (command: string, editState: EditorState): DraftHandleValue => {
        const newEditorState = RichUtils.handleKeyCommand(editState, command);
        if (newEditorState) {
            setEditorContent(newEditorState)
            return 'handled'
        }
        return 'not-handled'
    }
    return (
        <Editor editorState={editorContent}
                handleKeyCommand={handleSpecialInput}
                onChange={setEditorContent}/>
    )
}

export default CreateBlog