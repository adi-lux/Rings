import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { Controller, useForm } from "react-hook-form";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import log from "loglevel";
import useApi from "../hooks/useApi";

type BlogForm = {
  title: string;
  content: EditorState;
};

function EditBlog() {
  const { request } = useApi();
  const { blogId, userName } = useParams();
  const [posted, setPosted] = useState(false);
  const [published, setPublished] = useState(false);
  // TODO: Implement Title
  const { register, control, handleSubmit, setValue } = useForm<BlogForm>({
    defaultValues: {
      title: "",
      content: EditorState.createEmpty(),
    },
  });

  useEffect(() => {
    const abortController: AbortController = new AbortController();

    (async () => {
      try {
        const req = await request();

        const { data } = await req.get(`/users/${userName}/blogs/${blogId}`);
        const { title, content } = data;
        setValue(
          "content",
          EditorState.createWithContent(convertFromRaw(JSON.parse(content)))
        );
        setValue("title", title);
      } catch (e) {
        log.error(e);
      }
    })();
    abortController?.abort();
  }, []);

  const onFormSubmit = async (fields: BlogForm) => {
    try {
      const content = JSON.stringify(
        convertToRaw(fields.content.getCurrentContent())
      );
      const req = await request();

      await req.put(`/users/${userName}/blogs/${blogId}`, {
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
          Title: <input id="title" {...register("title", { required: true })} />
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
      {posted && <Navigate to={`/users/${userName}/blogs/${blogId}`} replace />}
    </>
  );
}

export default EditBlog;