import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Auth0Provider} from '@auth0/auth0-react';
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
import CreateBlog from './components/CreateBlog'; // Imports

const App = () => {
    // Every user will have one profile, and can be involved in multiple rings.
    // A user can choose the allowed rings for a blog post
    // TODO: Retrieve JWT within localStorage and pass down to required paths
    return (
        <Auth0Provider
            domain={import.meta.env.VITE_DOMAIN}
            clientId={import.meta.env.VITE_CLIENT_ID}
            audience={import.meta.env.VITE_AUDIENCE}
            redirectUri={window.location.origin}
            screen_hint="signup"
            scope='read'
        >
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<HomePage/>}/>
                    <Route path='rings'>
                        <Route index element={<Rings/>}/>
                        <Route path=':ringName' element={<Ring/>}/>
                    </Route>
                    <Route path='users'>
                        <Route index element={<Users/>}/>
                        <Route path=':userName'>
                            <Route index element={<UserProfile/>}/>
                            <Route path='blogs'>
                                <Route index element={<Blogs/>}/>
                                <Route path=':blogName' element={<BlogPost/>}/>
                            </Route>
                            <Route path='chat' element={<Chat/>}/>
                        </Route>
                    </Route>
                    <Route path='create' element={<CreateBlog/>}/>
                    <Route path='*' element={<NotFound/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
</Auth0Provider>
    )
}

export default App