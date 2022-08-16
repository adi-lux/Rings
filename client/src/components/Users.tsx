import { NavLink, useParams } from 'react-router-dom';

function Users() {
  const { userName } = useParams();
  console.log(userName);

  return (
    <div>
      User
      <NavLink to="switchoroo/blogs">Blogs</NavLink>
    </div>
  );
}

export default Users;
