// TODO: API fetch call to /rings and grab list of valid rings

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import log from "loglevel";
import useApi from "../../hooks/useApi";

interface Ring {
  name: string;
  private: Boolean;
  members: string[];
}

function Rings() {
  const { request } = useApi();
  const [ringList, setRingList] = useState<Ring[]>([]);

  useEffect(() => {
    const abortController: AbortController = new AbortController();
    (async () => {
      try {
        const req = await request();
        const { data } = await req.get("/rings/");
        const { rings } = data;
        log.info("get rings", { data });
        setRingList(rings);
      } catch (e) {
        log.error(e);
      }
    })();
    return () => abortController?.abort();
  }, []);

  return (
    <div>
      <Link to="create">Make one!</Link>
      <p>Rings</p>
      {ringList.map((ring) => (
        <Link key={ring.name} to={ring.name}>
          <p>{ring.name}</p>
        </Link>
      ))}
    </div>
  );
}

export default Rings;