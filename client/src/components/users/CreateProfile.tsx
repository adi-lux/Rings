import { convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { Controller, useForm } from "react-hook-form";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import useApi from "../../hooks/useApi";

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
    <div className="grid p-10 gap-4">
      <h1 className="font-bold text-2xl">Create {username} profile</h1>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="border-2 rounded-lg  rounded-bl-none rounded-br-none border-theme-babyblue"
      >
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
        <button type="submit" className="classic-btn w-full rounded-none">
          Submit
        </button>
      </form>
      {posted && <Navigate to={`/users/${username}/`} />}
    </div>
  );
}

export default CreateProfile;