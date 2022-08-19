import { Link, NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { stateToHTML } from "draft-js-export-html";
import { convertFromRaw } from "draft-js";
import useApi from "../../hooks/useApi";

interface Profile {
  content: string;
}

function UserProfile({ user }: { user: string }) {
  const { userName } = useParams();
  const { request } = useApi();
  const [userProfile, setUserProfile] = useState<Profile>({ content: "" });
  useEffect(() => {
    const abortController: AbortController = new AbortController();

    (async () => {
      const req = await request();
      const { data } = await req.get(`/users/${userName}`);
      setUserProfile({
        content: stateToHTML(
          convertFromRaw(JSON.parse(data.profilePage.content))
        ),
      });
    })();

    return () => abortController?.abort();
  }, []);
  const userHTML = (userH: string) => ({ __html: userH });
  return (
    <div>
      <h1>Page of {userName}...</h1>
      {userProfile.content && (
        <>
          <Link to="edit">Edit Profile</Link>
          <div dangerouslySetInnerHTML={userHTML(userProfile.content)} />
        </>
      )}
      {!userProfile.content && userName === user && (
        <Link to="create">Create Profile</Link>
      )}
      <nav>
        <NavLink to="">Profile</NavLink>
        <NavLink to="blogs">Blogs</NavLink>
        <NavLink to="chat">Chat!</NavLink>
        <NavLink to="friends">Friends</NavLink>
      </nav>
    </div>
  );
}

export default UserProfile;