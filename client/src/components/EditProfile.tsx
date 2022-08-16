import {convertFromRaw, convertToRaw, EditorState} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import {useForm, Controller} from 'react-hook-form';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {DevTool} from '@hookform/devtools';
import axios from 'axios';
import {useAuth0} from '@auth0/auth0-react';
import {Navigate, useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';

type ProfileForm = {
    content: EditorState
};

function EditProfile({username}: { username: string }) {
    const {getAccessTokenSilently} = useAuth0();
    const {blogId, userName} = useParams();
    const [posted, setPosted] = useState(false);
    const [published, setPublished] = useState(false);
    // TODO: Implement Title
    const {
        register, control, handleSubmit, setValue,
    } = useForm<ProfileForm>({
        defaultValues: {
            content: EditorState.createEmpty(),
        },
    });

    useEffect(() => {
        getAccessTokenSilently({
            audience: import.meta.env.VITE_AUDIENCE,
        }).then((token) => axios.get(
            `${import.meta.env.VITE_AUDIENCE}/users/${userName}/`,
            {headers: {Authorization: `Bearer ${token}`}},
        )).then((response) => {
            const {profilePage} = response.data;
            setValue('content', EditorState.createWithContent(convertFromRaw(JSON.parse(profilePage.content))));
        });
    }, []);

    const onFormSubmit = (fields: ProfileForm) => {
        // make post command to
        const content = JSON.stringify(convertToRaw(fields.content.getCurrentContent()));
        // make axios post request to
        getAccessTokenSilently({
            audience: import.meta.env.VITE_AUDIENCE,
        }).then((token) => axios.put(
            `${import.meta.env.VITE_AUDIENCE}/users/${userName}/`,
            { content},
            {headers: {Authorization: `Bearer ${token}`}},
        )).then(() => setPosted(true));
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
                <button type="submit" className="bg-blue-200" >Submit</button>

            </form>
            {posted && (
                <>
                    <Navigate to={`/users/${userName}`} replace/>
                </>
            )}
            <DevTool control={control}/>
        </>
    );
}


export default EditProfile