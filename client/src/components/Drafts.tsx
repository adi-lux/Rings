import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useApi from "../hooks/useApi";

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
    <>
      <h1>Your Drafts</h1>
      {user === (userName as string) && (
        <>
          {blogPosts.map((blogPost) => (
            <div>
              <b>Title: </b>
              <Link to={`${encodeURIComponent(blogPost._id)}`}>
                {blogPost.title}
              </Link>
              <br />
            </div>
          ))}
        </>
      )}
    </>
  );
}

export default Drafts;