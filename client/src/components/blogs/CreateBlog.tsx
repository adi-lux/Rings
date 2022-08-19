import { convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { Controller, useForm } from "react-hook-form";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import log from "loglevel";
import useApi from "../../hooks/useApi";

type BlogForm = {
  title: string;
  content: EditorState;
};

function CreateBlog({ username }: { username: string }) {
  const [posted, setPosted] = useState(false);
  const [published, setPublished] = useState(false);
  const { request } = useApi();
  // TODO: Implement Title
  const { register, control, handleSubmit } = useForm<BlogForm>({
    defaultValues: {
      title: "",
      content: EditorState.createEmpty(),
    },
  });

  const onFormSubmit = async (fields: BlogForm) => {
    // make post command to
    try {
      const content = JSON.stringify(
        convertToRaw(fields.content.getCurrentContent())
      );
      const req = await request();

      await req.post(`/users/${username}/blogs`, {
        title: fields.title,
        content,
        published,
      });
      setPosted(true);
    } catch (e) {
      log.error(e);
    }
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
      {posted && <Navigate to={`/users/${username}/blogs`} replace />}
    </>
  );
}

export default CreateBlog;