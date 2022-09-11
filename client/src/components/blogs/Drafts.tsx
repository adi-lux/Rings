import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";

interface Blog {
  _id: string;
  title: string;
  posted: Date;
  content: string;
}

function Drafts({ user }: { user: string }) {
  const { userName } = useParams();
  const { request } = useApi();
  const [blogPosts, setBlogPosts] = useState<Blog[]>([]);
  useEffect(() => {
    const abortController: AbortController = new AbortController();

    (async () => {
      const req = await request();
      const { data } = await req.get(`/users/${userName}/blogs`);
      setBlogPosts(
        data.filter(({ published }: { published: boolean }) => !published)
      );
    })();

    return () => abortController?.abort();
  }, []);

  return (
    <div className="grid p-10 gap-4">
      <h1 className="text-4xl">Your Drafts</h1>
      {user === (userName as string) && (
        <>
          {blogPosts.map((blogPost) => (
            <div className="text-white w-full px-3 h-20 grid-cols-2 bg-theme-mediumblue items-center rounded-xl pl-5 grid border-2 border-white hover:shadow-lg active:opacity-95">
              <Link
                to={`${encodeURIComponent(blogPost._id)}`}
                className="text-2xl font-bold"
              >
                {blogPost.title}
              </Link>
              <br />
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Drafts;