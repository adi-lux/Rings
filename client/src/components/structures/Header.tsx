import { Link, NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import assetUrl from "../../assets/logo.svg";

function Header({ user }: { user: string }) {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  return (
    <header className="grid grid-cols-2 box-border pl-2 pr-2 shadow-lg bg-theme-lightblue">
      <Link
        to="/"
        className="self-center col-span-1 m-5 font-bold text-theme-black sm:text-md md:text-2xl lg:text-3xl"
      >
        <img
          src={assetUrl}
          alt="BlogRings logo"
          className="self-center max-h-16"
        />
      </Link>
      <nav className="justify-self-end self-center col-span-1 flex items-center justify-end gap-5 m-5 sm:text-xs md:text-md lg:text-lg">
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