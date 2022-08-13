import {BrowserRouter, Routes, Route} from 'react-router-dom'
import App from './App';
import Rings from './components/Rings';
import Users from './components/Users';

const Routing = () => {
    // Every user will have one profile, and can be involved in multiple rings.
    // A user can choose the allowed rings for a blog post
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App/>}/>
                <Route path='/rings' element={<Rings/>}/>
                <Route path='/users' element={<Users/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Routing