import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

// TODO: Restrict users to only  being able to see people in their rings
function Users() {
  const { getAccessTokenSilently } = useAuth0();
  const [userList, setUserList] = useState<string[]>([]);
  useEffect(() => {
    getAccessTokenSilently({
      audience: import.meta.env.VITE_AUDIENCE,
    })
      .then((token) =>
        axios.get(`${import.meta.env.VITE_AUDIENCE}/users`, {
          headers: { Authorization: `Bearer ${token}` },
        })
      )
      .then((response) => {
        const newInfo = response.data.map((item: { _id: string }) => item._id);
        setUserList(newInfo);
      });
  }, []);
  return (
    <div>
      User:{" "}
      {userList.map((user) => (
        <p key={user}>
          <Link to={user}>{user} / </Link>{" "}
          <Link to={`${user}/blogs`}>Blogs</Link>
        </p>
      ))}
    </div>
  );
}

export default Users;