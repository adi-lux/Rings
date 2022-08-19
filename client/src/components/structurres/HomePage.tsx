import { Link } from "react-router-dom";

function HomePage() {
  // TODO: Wrap in React Router Layer. Every Time a new React Router Component is called, API Call.
  // TODO: SOCKET.IO FOR THE PERSISTENCE

  return (
    <main className="grid">
      <p>Welcome to blog rings!</p>
      <Link to="create">Create a post</Link>
    </main>
  );
}

export default HomePage;