import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {useAuth0} from '@auth0/auth0-react';
import {useEffect, useState} from 'react';
import axios from 'axios'; // Imports
import log from 'loglevel';
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
import EditBlog from './components/EditBlog';
import Drafts from './components/Drafts';
import CreateProfile from './components/CreateProfile';
import EditProfile from './components/EditProfile';
import CreateRing from './components/CreateRing';

// TODO: Refactor functionality and remove redundancy
// TODO: Create proper UI layout

function App() {
  // Every user will have one profile, and can be involved in multiple rings.
  // A user can choose the allowed rings for a blog post
  const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();
  const [username, setUsername] = useState("");
  useEffect(() => {
    (() => {
      getAccessTokenSilently({
        audience: import.meta.env.VITE_AUDIENCE,
        scope: "read",
      })
        .then((token) =>
          axios.get("http://localhost:3000/", {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
        )
        .then((response) => setUsername(response.data.username))
        .catch((e) => log.error(e));
    })();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout user={username} />}>
          <Route index element={<HomePage />} />
          {isAuthenticated ? (
            <>
              <Route path="rings">
                <Route index element={<Rings />} />
                <Route
                  path="create"
                  element={<CreateRing username={username} />}
                />
                <Route path=":ringName" element={<Ring user={username} />} />
              </Route>
              <Route path="users">
                <Route index element={<Users />} />
                <Route path=":userName">
                  <Route index element={<UserProfile user={username} />} />
                  <Route
                    path="create"
                    element={<CreateProfile username={username} />}
                  />
                  <Route
                    path="edit"
                    element={<EditProfile username={username} />}
                  />
                  <Route path="blogs">
                    <Route index element={<Blogs />} />
                    <Route path=":blogId">
                      <Route index element={<BlogPost user={username} />} />
                      <Route path="edit" element={<EditBlog />} />
                    </Route>
                  </Route>
                  <Route path="drafts">
                    <Route index element={<Drafts user={username} />} />
                    <Route path=":blogId" element={<EditBlog />} />
                  </Route>
                  <Route path="chat" element={<Chat user={username} />} />
                </Route>
              </Route>
              <Route
                path="create"
                element={<CreateBlog username={username} />}
              />
              <Route path="*" element={<NotFound />} />
            </>
          ) : undefined}
          {isLoading ? (
            <Route path="*" element={<p>LOADING!!</p>} />
          ) : (
            <Route path="*" element={<p>Sign in!!!</p>} />
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;