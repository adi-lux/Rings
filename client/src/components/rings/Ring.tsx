// TODO: API fetch call to /rings/:ringId and grab specific ring and display it

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import log from "loglevel";
import useApi from "../../hooks/useApi";

function Ring({ user }: { user: string }) {
  const { request } = useApi();
  const { ringName } = useParams();
  const [userList, setUserList] = useState<string[]>([]);
  useEffect(() => {
    const abortController: AbortController = new AbortController();
    (async () => {
      try {
        const req = await request();

        const { data } = await req.get(`/rings/${ringName}`);
        const { ring } = data;
        setUserList(ring.members);
      } catch (e) {
        log.error(e);
      }
    })();
    return () => abortController?.abort();
  }, []);

  const joinRing = async () => {
    try {
      const req = await request();

      const { data } = await req.put(`/rings/${ringName}`, {
        username: user,
      });
      const { newRing } = data;
      setUserList(newRing.members);
    } catch (e) {
      log.error(e);
    }
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