import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import useApi from '../hooks/useApi';

// TODO: Restrict users to only  being able to see people in their rings
function Users() {
  const { request } = useApi();
  const [userList, setUserList] = useState<string[]>([]);
  useEffect(() => {
    const abortController: AbortController = new AbortController();

    (async () => {
      const req = await request();

      const { data } = await req.get("/users");
      const newInfo = data.map((item: { _id: string }) => item._id);
      setUserList(newInfo);
    })();

    return () => abortController?.abort();
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