import {convertToRaw, EditorState} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import {useForm, Controller} from 'react-hook-form';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {DevTool} from '@hookform/devtools';
import axios from 'axios';
import {useAuth0} from '@auth0/auth0-react';
import {Navigate} from 'react-router-dom';
import {useState} from 'react';

type ProfileForm = {
    content: EditorState
};

function CreateProfile({username}: { username: string }) {
    const {getAccessTokenSilently} = useAuth0();
    const [posted, setPosted] = useState(false);
    // TODO: Implement Title
    const {control, handleSubmit} = useForm<ProfileForm>({
        defaultValues: {
            content: EditorState.createEmpty(),
        },
    });

    const onFormSubmit = (fields: ProfileForm) => {
        // make post command to
        const content = JSON.stringify(convertToRaw(fields.content.getCurrentContent()));
        // make axios post request to
        getAccessTokenSilently({
            audience: import.meta.env.VITE_AUDIENCE,
        }).then((token) => axios.post(
            `${import.meta.env.VITE_AUDIENCE}/users/${username}/`,
            {content},
            {headers: {Authorization: `Bearer ${token}`}},
        ));
        setPosted(true);
    };


    return (
        <>
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <Controller
                    name="content"
                    control={control}
                    rules={{required: true}}
                    render={({field: {value, onChange}}) => (
                        <Editor
                            editorState={value}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            onEditorStateChange={onChange}
                        />
                    )}
                />
                <button type="submit" className="bg-blue-200">Submit</button>

            </form>
            {posted && (
                <>
                    <Navigate to={`/users/${username}/`}/>
                </>
            )}
            <DevTool control={control}/>
        </>
    );
}

export default CreateProfile;