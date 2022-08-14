import {Outlet} from 'react-router-dom';
import Header from './Header';


const Layout = ()  => {
    //TODO: Check to see if the user has signed in or not
    return (
        <div className='layout bg-theme-white font-sans h-screen w-screen'>
            <Header/>
            <Outlet/>
        </div>
    )
}
export default Layout;