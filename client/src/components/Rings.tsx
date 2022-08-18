// TODO: API fetch call to /rings and grab list of valid rings

import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import log from "loglevel";

interface Ring {
  name: string;
  private: Boolean;
  members: string[];
}

function Rings() {
  const {getAccessTokenSilently} = useAuth0();
  const [ringList, setRingList] = useState<Ring[]>([]);
  useEffect(() => {
    getAccessTokenSilently({
      audience: import.meta.env.VITE_AUDIENCE,
    })
        .then((token) =>
            axios.get(`${import.meta.env.VITE_AUDIENCE}/rings/`, {
              headers: {Authorization: `Bearer ${token}`},
            })
        )
        .then((response) => {
          const {rings} = response.data;
          log.info("get rings", rings);
          setRingList(rings);
        });
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