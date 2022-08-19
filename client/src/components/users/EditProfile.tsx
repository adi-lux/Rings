import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { Controller, useForm } from "react-hook-form";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import log from "loglevel";
import useApi from "../../hooks/useApi";

type ProfileForm = {
  content: EditorState;
};

function EditProfile({ username }: { username: string }) {
  const { request } = useApi();
  const { userName } = useParams();
  const [posted, setPosted] = useState(false);
  // TODO: Implement Title
  const { control, handleSubmit, setValue } = useForm<ProfileForm>({
    defaultValues: {
      content: EditorState.createEmpty(),
    },
  });

  useEffect(() => {
    const abortController: AbortController = new AbortController();

    (async () => {
      try {
        const req = await request();

        const { data } = await req.get(`/users/${userName}/`);
        const { profilePage } = data;
        setValue(
          "content",
          EditorState.createWithContent(
            convertFromRaw(JSON.parse(profilePage.content))
          )
        );
      } catch (e) {
        log.error(e);
      }
    })();
    abortController?.abort();
  }, []);

  const onFormSubmit = async (fields: ProfileForm) => {
    // make post command to
    try {
      const content = JSON.stringify(
        convertToRaw(fields.content.getCurrentContent())
      );
      const req = await request();

      await req.put(`/users/${userName}/`, { content });
      setPosted(true);
    } catch (e) {
      log.error(e);
    }
  };

  return (
    <>
      <h1>Edit {userName} profile</h1>
      {username === userName && (
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
      )}
      {posted && <Navigate to={`/users/${userName}`} replace />}
    </>
  );
}

export default EditProfile;