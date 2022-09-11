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
    <div className="grid grid-flow-row p-10 gap-2">
      {!userList.includes(user) && (
        <button
            type="button"
            onClick={joinRing}
            className="classic-btn text-white"
          >
            Join Ring
          </button>
      )}

      <h1 className="font-bold text-2xl">User List</h1>
      <hr />
      {userList.map((person) => (
        <p
          key={person}
          className="w-full h-20 flex bg-theme-babyblue items-center rounded-xl pl-5 grid border-2 border-white hover:shadow-lg active:opacity-95"
        >
          <Link to={`/users/${person}`}>{person}</Link>
        </p>
      ))}
    </div>
  );
}

export default Ring;