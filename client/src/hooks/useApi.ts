import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import log from "loglevel";

const useApi = () => {
  const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();
  const request = async () => {
    try {
      const token = await getAccessTokenSilently({
        audience: import.meta.env.VITE_AUDIENCE,
      });
      return axios.create({
        baseURL: import.meta.env.VITE_AUDIENCE,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (e) {
      log.error(`Error occurred while trying to get access token: ${e}`);
      return axios.create({
        baseURL: import.meta.env.VITE_AUDIENCE,
      });
    }
  };
  return { request, isAuthenticated, isLoading };
};
export default useApi;