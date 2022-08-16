import { Link, NavLink, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

function Users() {
  const { userName } = useParams();
  const { getAccessTokenSilently } = useAuth0();
  const [userList, setUserList] = useState<string[]>([]);
  useEffect(() => {
    getAccessTokenSilently({
      audience: import.meta.env.VITE_AUDIENCE,
    }).then((token) => axios.get(
      `${import.meta.env.VITE_AUDIENCE}/users`,
      { headers: { Authorization: `Bearer ${token}` } },
    )).then((response) => {
      const newInfo = response.data.map((item: { _id: string; }) => item._id);
      setUserList(newInfo);
    });
  }, []);
  return (
    <div>
      User:
      {' '}
      {' '}
      <NavLink to="switchoroo/blogs">Blogs</NavLink>
      {userList.map((userName) => <p key={userName}><Link to={userName}>{userName}</Link></p>)}
    </div>
  );
}

export default Users;
