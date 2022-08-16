import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

export function Blogs() {
  const { userName } = useParams();
  const { getAccessTokenSilently } = useAuth0();
  const [blogPosts, setBlogPosts] = useState<string[]>([]);

  useEffect(() => {
    getAccessTokenSilently({
      audience: import.meta.env.VITE_AUDIENCE,
    }).then((token) => axios.get(
      `${import.meta.env.VITE_AUDIENCE}/users/${userName}/blogs`,
      { headers: { Authorization: `Bearer ${token}` } },
    ))
      .then((response) => {
        const blogsList = response.data;
        setBlogPosts(blogsList.filter(({ published } : { published: boolean }) => published));
      });
  }, []);

  return (
    <div>
      {blogPosts.map((blogPost) => (
        <>
          <b>Title:</b>
          {' '}
          <Link to={`${encodeURIComponent(blogPost._id)}`}>{blogPost.title}</Link>
          <br />
        </>
      ))}
    </div>
  );
}
export default Blogs;
