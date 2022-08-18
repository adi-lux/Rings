import { convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { Controller, useForm } from "react-hook-form";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import { useState } from "react";

type BlogForm = {
  title: string;
  content: EditorState;
};

function CreateBlog({ username }: { username: string }) {
  const { getAccessTokenSilently } = useAuth0();
  const [posted, setPosted] = useState(false);
  const [published, setPublished] = useState(false);
  // TODO: Implement Title
  const { register, control, handleSubmit } = useForm<BlogForm>({
    defaultValues: {
      title: "",
      content: EditorState.createEmpty(),
    },
  });

  const onFormSubmit = (fields: BlogForm) => {
    // make post command to
    const content = JSON.stringify(
      convertToRaw(fields.content.getCurrentContent())
    );
    // make axios post request to
    getAccessTokenSilently({
      audience: import.meta.env.VITE_AUDIENCE,
    }).then((token) =>
      axios.post(
        `${import.meta.env.VITE_AUDIENCE}/users/${username}/blogs`,
        { title: fields.title, content, published },
        { headers: { Authorization: `Bearer ${token}` } }
      )
    );
    setPosted(true);
  };

  const publish = (saved: boolean) => () => setPublished(saved);

  return (
    <>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <label htmlFor="title">
          Title: <input {...register("title", { required: true })} />
        </label>
        <Controller
          name="content"
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <Editor
              editorState={value}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={onChange}
            />
          )}
        />
        <button type="submit" className="bg-blue-200" onClick={publish(true)}>
          Submit
        </button>
        <button type="submit" className="bg-blue-200">
          Save as Draft
        </button>
      </form>
      {posted && (
        <>
          <Navigate to={`/users/${username}/blogs`} replace />
          <p>APPLS</p>
        </>
      )}
    </>
  );
}

export default CreateBlog;