import { Link } from "react-router-dom";

function HomePage({ username }: { username: string }) {
  // TODO: Wrap in React Router Layer. Every Time a new React Router Component is called, API Call.
  // TODO: SOCKET.IO FOR THE PERSISTENCE

  return (
    <main className="grid p-10 gap-4">
      <h1 className="row-span-1 text-4xl font-bold text-left text-theme-mediumblue animate-pulse">
        Welcome to BlogRings
      </h1>
      <p className="row-span-1 text-xl text-left">
        Bringing nostalgia to your doorstep. Feel free to join a ring, update
        your profile, or post a blog post anytime.
      </p>

      <div className="row-span-1 grid grid-flow-col gap-5 place-content-start text-white">
        <Link to={`users/${username}`} className="classic-btn">
          Update your profile!
        </Link>
        <Link to="create" className="classic-btn">
          Make a blog post!
        </Link>
        <Link to="rings" className="classic-btn">
          Join a Ring!
        </Link>
      </div>
      <div className="row-span-3 col-span-full">
        <h2 className="font-bold text-xl">About</h2>
        <hr />
        <p className="text-lg">
          BlogRings is a platform intended to indulge in the earlier ages of the
          internet, back when forums were dominant and social media was not as
          prevalent. The inspiration came from the idea of a Web Ring, where
          users could link other peoples blogs to give more exposure to them.
          With BlogRings, you have social circles of rings, which act as a
          replacement for the modern day group chat. Users of a ring could
          access other user blogs, and chat in their chat rooms. You will need
          to create an account to access the entire website.
        </p>
      </div>
    </main>
  );
}

export default HomePage;