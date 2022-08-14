import {NavLink, Link} from 'react-router-dom';
import {useAuth0} from '@auth0/auth0-react';

const Header = () => {
    const {loginWithRedirect, logout, isAuthenticated, user} = useAuth0();
    console.log(user);
    return (
        <header className="box-border bg-theme-gray text-theme-white h-20 shadow-lg grid grid-cols-2">
            <Link to="/" className="pl-10 self-center w-full text-3xl font-bold">BlogRings</Link>
            <nav className="items-center pr-10 flex justify-end gap-10 w-full justify-self-end self-center">
                <NavLink className={({isActive}) => isActive ? 'font-bold' : 'font-normal'} to="rings">Rings</NavLink>
                <NavLink className={({isActive}) => isActive ? 'font-bold' : 'font-normal'} to="users">Users</NavLink>
                {isAuthenticated ?
                 <a className="cursor-pointer" onClick={() => logout({returnTo: window.location.origin})}>Log Out</a> :
                 <a className="cursor-pointer" onClick={() => loginWithRedirect()}>Sign Up / Log In</a>
                }

            </nav>
        </header>
    );
};

export default Header;