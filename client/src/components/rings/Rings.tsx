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
    <div className="grid p-10 gap-4">
      <Link to="create" className="classic-btn text-white">
        Make a new ring!
      </Link>
      <div>
        <h1 className="text-4xl">All Rings</h1>
        <hr />
      </div>
      {ringList.map((ring) => (
        <Link
          key={ring.name}
          to={ring.name}
          className="w-full h-20 flex bg-theme-babyblue items-center rounded-xl pl-5 grid border-2 border-white hover:shadow-lg active:opacity-95"
        >
          <p className="text-2xl">{ring.name}</p>
        </Link>
      ))}
    </div>
  );
}

export default Rings;