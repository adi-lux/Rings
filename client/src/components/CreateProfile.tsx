import { convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { Controller, useForm } from "react-hook-form";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import useApi from "../hooks/useApi";

type ProfileForm = {
  content: EditorState;
};

function CreateProfile({ username }: { username: string }) {
  const { request } = useApi();
  const [posted, setPosted] = useState(false);
  // TODO: Implement Title
  const { control, handleSubmit } = useForm<ProfileForm>({
    defaultValues: {
      content: EditorState.createEmpty(),
    },
  });

  const onFormSubmit = async (fields: ProfileForm) => {
    // make post command to
    const content = JSON.stringify(
      convertToRaw(fields.content.getCurrentContent())
    );
    const req = await request();

    await req.post(`/users/${username}`, { content });
    setPosted(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onFormSubmit)}>
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
        <button type="submit" className="bg-blue-200">
          Submit
        </button>
      </form>
      {posted && <Navigate to={`/users/${username}/`} />}
    </>
  );
}

export default CreateProfile;