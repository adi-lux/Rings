import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";

type Blog = {
  _id: string;
  title: string;
  posted: Date;
  content: string;
};

function Blogs({ user }: { user: string }) {
  const { userName } = useParams();
  const { request } = useApi();
  const [blogPosts, setBlogPosts] = useState<Blog[]>([]);

  useEffect(() => {
    const abortController: AbortController = new AbortController();
    (async () => {
      const req = await request();
      const { data } = await req.get(`/users/${userName}/blogs`);
      setBlogPosts(
        data.filter(({ published }: { published: boolean }) => published)
      );
    })();
    return () => abortController?.abort();
  }, []);

  return (
    <div className="grid p-10 gap-4">
      {userName === user && (
        <div className="flex gap-3">
          <Link to="/create" className="classic-btn text-white">
            Make a new blog!
          </Link>
          <Link
            to={`/users/${userName}/drafts`}
            className="classic-btn text-white"
          >
            Edit your drafts!
          </Link>
        </div>
      )}

      <div>
        <h1 className="text-4xl">All Blogs</h1>
        <hr />
      </div>
      {blogPosts.map((blogPost) => (
        <div
          key={blogPost._id}
          className="text-white w-full px-3 h-20 grid-cols-2 bg-theme-mediumblue items-center rounded-xl pl-5 grid border-2 border-white hover:shadow-lg active:opacity-95"
        >
          <Link
            to={`${encodeURIComponent(blogPost._id)}`}
            className="text-2xl font-bold"
          >
            {blogPost.title}
          </Link>
          {userName === user && (
            <Link
              to={`${encodeURIComponent(blogPost._id)}/edit`}
              className="italic justify-self-end hover:text-theme-lightblue"
            >
              Edit
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}

export default Blogs;