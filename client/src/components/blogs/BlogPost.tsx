// TODO: Retrieve blog post from user and
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { stateToHTML } from "draft-js-export-html";
import { convertFromRaw } from "draft-js";
import { useForm } from "react-hook-form";
import log from "loglevel";
import useApi from "../../hooks/useApi";

type Comment = {
  content: string;
  _id: string;
  commenter: string;
  timestamp: string;
};
type Blog = {
  title: string;
  posted: Date;
  content: string;
  comments: Comment[];
};

type CommentForm = {
  content: string;
};

function BlogPost({ user }: { user: string }) {
  const { blogId, userName } = useParams();
  const { request } = useApi();
  const { register, handleSubmit } = useForm<CommentForm>({
    defaultValues: {
      content: "",
    },
  });
  const [commented, setCommented] = useState(false);
  const [blogContent, setBlogContent] = useState<Blog>({
    title: "",
    posted: new Date(0),
    content: "",
    comments: [],
  });

  useEffect(() => {
    const abortController: AbortController = new AbortController();
    (async () => {
      try {
        const req = await request();
        const { data } = await req.get(`/users/${userName}/blogs/${blogId}`);
        setBlogContent({
          ...data,
          content: stateToHTML(convertFromRaw(JSON.parse(data.content))),
        });
      } catch (e) {
        log.error(e);
      }
    })();

    return () => abortController?.abort();
  }, [commented]);

  const onFormSubmit = async (fields: { content: string }) => {
    try {
      const req = await request();
      await req.post(`/users/${userName}/blogs/${blogId}`, {
        content: fields.content,
        username: user,
      });
      setCommented(!commented);
    } catch (e) {
      log.error(e);
    }
  };

  const blogHTML = (html: string) => ({ __html: html });
  return (
    <>
      <p>
        <b>Title:</b> {blogContent?.title}
      </p>
      <p>
        <b>Author:</b> {userName}
      </p>
      <i>
        <b>Date:</b> {blogContent?.posted.toString()}
      </i>
      <div dangerouslySetInnerHTML={blogHTML(blogContent?.content)} />
      <br />
      <h1>Comments</h1>
      {blogContent.comments.map((comment) => (
        <div key={comment._id}>
          <p>{comment.commenter}</p>
          <i>{comment.timestamp}</i>
          <p>{comment.content}</p>
        </div>
      ))}
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <label htmlFor="content">
          Comment:
          <input id="content" {...register("content", { required: true })} />
        </label>
        <button type="submit" className="bg-blue-200">
          Submit
        </button>
      </form>
    </>
  );
}

export default BlogPost;