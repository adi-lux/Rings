import axios, { AxiosInstance } from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import log from "loglevel";

const useApi = () => {
  const [request, setRequest] = useState<AxiosInstance>(
    axios.create({ baseURL: import.meta.env.VITE_AUDIENCE })
  );
  const { getAccessTokenSilently } = useAuth0();
  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently({
          audience: import.meta.env.VITE_AUDIENCE,
        });
        const newRequest = axios.create({
          baseURL: import.meta.env.VITE_AUDIENCE,
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setRequest(() => newRequest);
      } catch (e) {
        log.error(`Error occurred while trying to get access token: ${e}`);
      }
    })();
  }, []);

  return request;
};
export default useApi;