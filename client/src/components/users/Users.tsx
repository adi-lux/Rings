import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import useApi from '../../hooks/useApi';

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
    <div className="grid p-10 gap-4">
      <h1 className="text-4xl">User List</h1>
      <hr />
      {userList.map((user) => (
        <div
          key={user}
          className="w-full h-20 flex justify-between px-5 flex-row bg-theme-babyblue items-center rounded-xl pl-5  border-2 border-white"
        >
          <Link
            to={user}
            className="font-bold hover:text-theme-mediumblue active:opacity-95"
          >
            {user}
          </Link>
          <div className="flex gap-4">
            <Link
              to={`${user}/blogs`}
              className="italic hover:text-theme-mediumblue active:opacity-95"
            >
              Blogs
            </Link>
            <Link
              to={`${user}/chat`}
              className="italic hover:text-theme-mediumblue active:opacity-95"
            >
              Chat
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Users;