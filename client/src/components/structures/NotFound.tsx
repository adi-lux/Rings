import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="grid bg-theme-mediumblue h-full">
      <Link
        to="/"
        className="place-self-center text-5xl text-white h-full w-full place-self-center text-center grid place-items-center"
      >
        Click anywhere to leave 404 zone...
      </Link>
    </div>
  );
}

export default NotFound;
// TODO: Design not found page