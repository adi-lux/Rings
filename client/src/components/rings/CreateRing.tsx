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
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="grid grid-cols-[90px_1fr] p-10 justify-items-center gap-2"
      >
        <h1 className="text-2xl font-bold col-span-full">Ring Details</h1>
        <hr className="col-span-full" />
        <label htmlFor="name" className="font-bold">
          Name:
        </label>
        <input
          id="name"
          {...register("name", { required: true })}
          className="w-full border-2 border-theme-babyblue rounded-md pl-2"
        />
        <label htmlFor="privacy" className="font-bold">
          Private:
        </label>
        <input
          id="privacy"
          {...register("privacy")}
          type="checkbox"
          className="justify-self-start"
        />
        <button
          type="submit"
          className="classic-btn col-span-full w-full place-self-center text-white"
        >
          Create
        </button>
      </form>
      {posted && <Navigate to={`/rings/${finalRingName}/`} />}
    </>
  );
}

export default CreateRing;