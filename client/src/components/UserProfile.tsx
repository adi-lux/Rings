import { Link, NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { stateToHTML } from "draft-js-export-html";
import { convertFromRaw } from "draft-js";
import { useAuth0 } from "@auth0/auth0-react";
import log from "loglevel";

interface Profile {
  content: string;
}

function UserProfile({ user }: { user: string }) {
  const { userName } = useParams();
  log.info(`User comparison: ${userName}, ${user}`);
  const { getAccessTokenSilently } = useAuth0();
  const [userProfile, setUserProfile] = useState<Profile>({ content: "" });
  useEffect(() => {
    getAccessTokenSilently({
      audience: import.meta.env.VITE_AUDIENCE,
    })
      .then((token) =>
        axios.get(`${import.meta.env.VITE_AUDIENCE}/users/${userName}/`, {
          headers: { Authorization: `Bearer ${token}` },
        })
      )
      .then((response) => {
        const givenUser = response.data;
        log.info(`User Profile: ${response.data}`);
        setUserProfile({
          content: stateToHTML(
            convertFromRaw(JSON.parse(givenUser.profilePage.content))
          ),
        });
      });
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
// TODO: Use Draft JS to edit user profile (use the internal state to edit profile)