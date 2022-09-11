import { Link, NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { stateToHTML } from "draft-js-export-html";
import { convertFromRaw } from "draft-js";
import useApi from "../../hooks/useApi";

interface Profile {
  content: string;
}

function UserProfile({user}: { user: string }) {
  const {userName} = useParams();
  const {request} = useApi();
  const [userProfile, setUserProfile] = useState<Profile>({content: ""});
  useEffect(() => {
    const abortController: AbortController = new AbortController();

    (async () => {
      const req = await request();
      const {data} = await req.get(`/users/${userName}`);
      setUserProfile({
        content: stateToHTML(
            convertFromRaw(JSON.parse(data.profilePage.content))
        ),
      });
    })();

    return () => abortController?.abort();
  }, []);
  const userHTML = (userH: string) => ({__html: userH});
  return (
      <div className="grid grid-rows-[50px_100px_1fr] p-10 w-screen h-full">
        <div className="grid grid-flow-col gap-4">
          <h1 className="self-center font-bold text-2xl">
            Welcome to the profile of {userName}
          </h1>
          {userName === user && userProfile.content && (
              <Link to="edit" className="classic-btn justify-self-end mr-2">
                Edit Profile
              </Link>
          )}
          {userName === user && !userProfile.content && (
              <Link to="create" className="classic-btn justify-self-end mr-2">
                Create Profile
              </Link>
          )}
        </div>
        <nav
            className=" text-white font-bold w-full h-20 flex justify-start gap-10 px-5 flex-row bg-theme-mediumblue items-center rounded-xl pl-5  border-2 border-white">
          <NavLink to="" className="hover:text-theme-lightblue">
            Profile
          </NavLink>
          <NavLink to="blogs" className="hover:text-theme-lightblue">
            Blogs
          </NavLink>
          <NavLink to="chat" className="hover:text-theme-lightblue">
            Chat!
          </NavLink>
        </nav>
        <div
            dangerouslySetInnerHTML={userHTML(userProfile?.content)}
            className="max-h-full border-4 rounded-xl p-5 border-theme-babyblue"
        />
      </div>
  );
}

export default UserProfile;