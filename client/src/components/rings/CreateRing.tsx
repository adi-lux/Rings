import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import log from "loglevel";
import useApi from "../../hooks/useApi";

type RingForm = {
  name: string;
  privacy: boolean;
};

function CreateRing({ username }: { username: string }) {
  const { request } = useApi();
  const [posted, setPosted] = useState(false);
  const [finalRingName, setFinalRingName] = useState("My Ring");
  // TODO: Implement Title
  const { register, handleSubmit } = useForm<RingForm>({
    defaultValues: {
      name: "My Ring",
      privacy: false,
    },
  });

  const onFormSubmit = async (fields: RingForm) => {
    // make post command to
    const { name, privacy } = fields;
    // make axios post request to
    try {
      const req = await request();

      await req.post("/rings/", { name, privacy, username });
      setFinalRingName(name);
      setPosted(true);
    } catch (e) {
      log.error(e);
    }
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