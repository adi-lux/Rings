// TODO: Retrieve blog post from user and
import { Link, useParams } from "react-router-dom";
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
    <div className="grid p-10 gap-1 h-full grid-rows-[100px_1fr_1fr]">
      <div className="grid grid-cols-[1fr_190px] grid-rows-[50px_50px] items-center">
        <h1 className="text-4xl"> {blogContent?.title}</h1>
        <i className="justify-self-end self-center col-start-2 col-end-3 row-start-1">
          {new Date(blogContent?.posted).toLocaleString()}
        </i>
        <Link
          to={`/users/${userName}`}
          className="flex place-self-start font-bold items-center gap-2 hover:text-theme-mediumblue w-fit col-span-full row-start-2"
        >
          {userName}
        </Link>
      </div>
      <div
        dangerouslySetInnerHTML={blogHTML(blogContent?.content)}
        className="border-2 rounded-lg p-2 h-full border-theme-babyblue h-full"
      />

      <div className="grid gap-1 ">
        <h2 className="font-bold">Comments:</h2>
        {blogContent.comments.map((comment) => (
          <div
            key={comment._id}
            className="grid grid-cols-2 w-full h-20 flex justify-between px-5 flex-row bg-blue-200 items-center rounded-xl pl-5  border-2 border-white"
          >
            <Link
              to={`/users/${comment.commenter}`}
              className="font-bold hover:text-theme-mediumblue w-fit"
            >
              {comment.commenter}
            </Link>
            <i className="justify-self-end">
              {new Date(comment.timestamp).toLocaleString()}
            </i>
            <p className="col-span-full">{comment.content}</p>
          </div>
        ))}
        <form onSubmit={handleSubmit(onFormSubmit)} className="grid gap-2">
          <label htmlFor="content">Leave a Comment</label>
          <input
            id="content"
            {...register("content", { required: true })}
            className="h-20 border-2 border-theme-lightblue"
          />
          <button type="submit" className="bg-blue-200">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default BlogPost;