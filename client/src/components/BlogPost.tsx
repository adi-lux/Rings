// TODO: Retrieve blog post from user and
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { stateToHTML } from 'draft-js-export-html';
import {convertFromRaw} from 'draft-js';
import { useAuth0 } from '@auth0/auth0-react';
import {useForm} from 'react-hook-form';

function BlogPost({user} : {user: string}) {
    type comment = {
        content: string,
        _id: string,
        commenter: string,
        timestamp: string
    }
    type blog = {
      title: string
      posted: Date
      content: string
        comments: comment[]
    };

    type commentForm = {
        content: string
    }
    const { blogId, userName } = useParams();
    const { getAccessTokenSilently } = useAuth0();
    const {register, handleSubmit} = useForm<commentForm>({
        defaultValues: {
            content: '',
        },
    });
    const [blogContent, setBlogContent] = useState<blog>({ title: '', posted: new Date(0), content: '', comments: [] });
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
    },[]);

    const onFormSubmit = (fields: {content: string}) => {
        // make post command to
        // make axios post request to
        getAccessTokenSilently({
            audience: import.meta.env.VITE_AUDIENCE,
        }).then((token) => axios.post(
            `${import.meta.env.VITE_AUDIENCE}/users/${userName}/blogs/${blogId}`,
            {content: fields.content, username: user},
            {headers: {Authorization: `Bearer ${token}`}},
        ))
    };

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
          <h1>Comments</h1>
          {blogContent.comments.map((comment) => {
              console.log(comment);
              return (<div key={comment._id}>
                  <p>{comment.commenter}</p>
                  <i>{comment.timestamp}</i>
                  <p>{comment.content}</p>
              </div>)
          })}
          <form onSubmit={handleSubmit(onFormSubmit)}>
              <label htmlFor="content">Comment: </label>
              <input {...register('content', {required: true})} />
              <button type="submit" className="bg-blue-200">Submit</button>
          </form>
      </>
    );
}
export default BlogPost;