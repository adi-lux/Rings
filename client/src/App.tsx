import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {  useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import axios from 'axios'; // Imports
import HomePage from './components/HomePage';
import Rings from './components/Rings';
import Ring from './components/Ring';
import UserProfile from './components/UserProfile';
import Layout from './components/Layout';
import Blogs from './components/Blogs';
import Chat from './components/Chat';
import BlogPost from './components/BlogPost';
import Users from './components/Users';
import NotFound from './components/NotFound';
import CreateBlog from './components/CreateBlog';

function App() {
  // Every user will have one profile, and can be involved in multiple rings.
  // A user can choose the allowed rings for a blog post
  // TODO: Retrieve JWT within localStorage and pass down to required paths
  const {
    getAccessTokenSilently, isAuthenticated,
  } = useAuth0();
  const [username, setUsername] = useState('');
  useEffect(() => {
    (() => {
      getAccessTokenSilently({
        audience: import.meta.env.VITE_AUDIENCE,
        scope: 'read',
      })
        .then((token) => axios.get('http://localhost:3000/', {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }))
        .then((response) => setUsername(response.data.username))
        .catch((e) => console.error(e));
    })();
  }, []);
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          {isAuthenticated ? (
            <>
              <Route path="rings">
                <Route index element={<Rings />} />
                <Route path=":ringName" element={<Ring />} />
              </Route>
              <Route path="users">
                <Route index element={<Users />} />
                <Route path=":userName">
                    <Route index element={<UserProfile />} />
                    <Route path="blogs">
                      <Route index element={<Blogs />} />
                      <Route path=":blogName" element={<BlogPost />} />
                    </Route>
                    <Route path="chat" element={<Chat />} />
                  </Route>
              </Route>
              <Route path="create" element={<CreateBlog username={username} />} />
              <Route path="*" element={<NotFound />} />
            </>
          ) : undefined}
          <Route path="*" element={<p>Sign in!!!</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;