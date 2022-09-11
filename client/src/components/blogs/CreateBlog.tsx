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
    <div className="grid p-10 gap-4">
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="border-2 rounded-lg  rounded-bl-none rounded-br-none border-theme-babyblue"
      >
        <div className="flex gap-2 p-2">
          <label htmlFor="title" className="font-bold">
            Title:
          </label>
          <input
            {...register("title", { required: true })}
            className="bg-blue-50 w-full rounded-xl px-2"
          />
        </div>
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
        <div className="flex gap-1 p-1">
          <button
            type="submit"
            onClick={publish(true)}
            className="classic-btn w-full rounded-none"
          >
            Submit
          </button>
          <button type="submit" className="classic-btn w-full rounded-none">
            Save as Draft
          </button>
        </div>
      </form>
      {posted && <Navigate to={`/users/${username}/blogs`} replace />}
    </div>
  );
}

export default CreateBlog;