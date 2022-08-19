import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {useEffect, useState} from 'react';
import log from 'loglevel';
import HomePage from './components/structurres/HomePage';
import Rings from './components/rings/Rings';
import Ring from './components/rings/Ring';
import UserProfile from './components/users/UserProfile';
import Layout from './components/structurres/Layout';
import Blogs from './components/blogs/Blogs';
import Chat from './components/users/Chat';
import BlogPost from './components/blogs/BlogPost';
import Users from './components/users/Users';
import NotFound from './components/structurres/NotFound';
import CreateBlog from './components/blogs/CreateBlog';
import EditBlog from './components/blogs/EditBlog';
import Drafts from './components/blogs/Drafts';
import CreateProfile from './components/users/CreateProfile';
import EditProfile from './components/users/EditProfile';
import CreateRing from './components/rings/CreateRing';
import useApi from './hooks/useApi';

// TODO: Refactor functionality and remove redundancy
// TODO: Create proper UI layout

function App() {
  // Every user will have one profile, and can be involved in multiple rings.
  // A user can choose the allowed rings for a blog post
  const { request, isLoading, isAuthenticated } = useApi();
  const [username, setUsername] = useState("");
  useEffect(() => {
    const abortController: AbortController = new AbortController();
    (async () => {
      try {
        const req = await request();
        const response = await req.get("");
        setUsername(response.data.username);
      } catch (e) {
        log.error(e);
      }
    })();
    return () => abortController?.abort();
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