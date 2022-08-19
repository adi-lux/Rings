import { Link, NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function Header({ user }: { user: string }) {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  return (
    <header className="box-border bg-theme-gray text-theme-white h-20 shadow-lg grid grid-cols-2">
      <Link to="/" className="pl-10 self-center w-full text-3xl font-bold">
        BlogRings
      </Link>
      <nav className="items-center pr-10 flex justify-end gap-10 w-full justify-self-end self-center">
        <NavLink
          className={({ isActive }) => (isActive ? "font-bold" : "font-normal")}
          to="/rings"
        >
          Rings
        </NavLink>
        <NavLink
          end
          className={({ isActive }) => (isActive ? "font-bold" : "font-normal")}
          to="/users"
        >
          Users
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "font-bold" : "font-normal")}
          to={`/users/${user}`}
        >
          Profile
        </NavLink>
        {isAuthenticated ? (
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => logout({ returnTo: window.location.origin })}
          >
            Log Out
          </button>
        ) : (
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => loginWithRedirect()}
          >
            Sign Up / Log In
          </button>
        )}
      </nav>
    </header>
  );
}

export default Header;