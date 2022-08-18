import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import { useState } from "react";

type RingForm = {
  name: string;
  privacy: boolean;
};

function CreateRing({ username }: { username: string }) {
  const { getAccessTokenSilently } = useAuth0();
  const [posted, setPosted] = useState(false);
  const [finalRingName, setFinalRingName] = useState("My Ring");
  // TODO: Implement Title
  const { register, handleSubmit } = useForm<RingForm>({
    defaultValues: {
      name: "My Ring",
      privacy: false,
    },
  });

  const onFormSubmit = (fields: RingForm) => {
    // make post command to
    const { name, privacy } = fields;
    // make axios post request to
    getAccessTokenSilently({
      audience: import.meta.env.VITE_AUDIENCE,
    }).then((token) =>
      axios.post(
        `${import.meta.env.VITE_AUDIENCE}/rings/`,
        { name, privacy, username },
        { headers: { Authorization: `Bearer ${token}` } }
      )
    );
    setFinalRingName(name);
    setPosted(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <label htmlFor="name">
          Ring Name:
          <input id="name" {...register("name", { required: true })} />
        </label>
        <label htmlFor="privacy">
          Private:
          <input id="privacy" {...register("privacy")} type="checkbox" />
        </label>
        <button type="submit" className="bg-blue-200">
          Submit
        </button>
      </form>
      {posted && <Navigate to={`/rings/${finalRingName}/`} />}
    </>
  );
}

export default CreateRing;