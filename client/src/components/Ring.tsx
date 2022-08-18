// TODO: API fetch call to /rings/:ringId and grab specific ring and display it

import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useParams } from "react-router-dom";
import log from "loglevel";

function Ring({ user }: { user: string }) {
  const { getAccessTokenSilently } = useAuth0();
  const { ringName } = useParams();
  const [userList, setUserList] = useState<string[]>([]);
  useEffect(() => {
    getAccessTokenSilently({
      audience: import.meta.env.VITE_AUDIENCE,
    })
      .then((token) =>
        axios.get(`${import.meta.env.VITE_AUDIENCE}/rings/${ringName}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
      )
      .then((response) => {
        const { ring } = response.data;
        setUserList(ring.members);
      });
  }, []);
  const joinRing = () => {
    getAccessTokenSilently({
      audience: import.meta.env.VITE_AUDIENCE,
    })
      .then((token) =>
        axios.put(
          `${import.meta.env.VITE_AUDIENCE}/rings/${ringName}`,
          { username: user },
          { headers: { Authorization: `Bearer ${token}` } }
        )
      )
      .then((response) => {
        const { newRing } = response.data;
        log.info(newRing);
        setUserList(newRing.members);
      });
  };
  return (
    <>
      {!userList.includes(user) && (
        <button type="button" onClick={joinRing}>
          Join!
        </button>
      )}
      {userList.map((person) => (
        <p key={person}>
          <Link to={`/users/${person}`}>{person}</Link>
        </p>
      ))}
    </>
  );
}

export default Ring;