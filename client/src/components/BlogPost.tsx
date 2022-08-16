// TODO: Retrieve blog post from user and
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { stateToHTML } from 'draft-js-export-html';
import { convertFromRaw } from 'draft-js';
import { useAuth0 } from '@auth0/auth0-react';

function BlogPost() {
    type blog = {
      title: string
      posted: Date
      content: string
    };
    const { blogId, userName } = useParams();
    const { getAccessTokenSilently } = useAuth0();
    const [blogContent, setBlogContent] = useState<blog>({ title: '', posted: new Date(0), content: '' });
    useEffect(() => {
      getAccessTokenSilently({
        audience: import.meta.env.VITE_AUDIENCE,
      }).then((token) => axios.get(
        `${import.meta.env.VITE_AUDIENCE}/users/${userName}/blogs/${blogId}`,
        { headers: { Authorization: `Bearer ${token}` } },
      ))
        .then((response) => {
          const blog = response.data;
          setBlogContent({ ...blog, content: stateToHTML(convertFromRaw(JSON.parse(blog.content))) });
        });
    });
    const blogHTML = (blogHTML: string) => ({ __html: blogHTML });
    return (
      <>
        <p>
          <b>Title:</b>
          {' '}
          {blogContent?.title}
        </p>
        <p>
          <b>Author:</b>
          {' '}
          {userName}
        </p>
        <i>
          <b>Date:</b>
          {' '}
          {blogContent?.posted.toString()}
        </i>
        <div dangerouslySetInnerHTML={blogHTML(blogContent?.content)} />
        <br />
      </>
    );
}
export default BlogPost;
