import React, { useCallback } from "react";

import { BsBell, BsEnvelope, BsSearch, BsTwitterX } from "react-icons/bs";
import { MdHomeFilled } from "react-icons/md";
import { PiBookmarkSimpleLight } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import FeedCard from "@/components/FeedCard";
import toast from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleToken } from "@/graphql/query/user";

interface SideBarButtons {
  title: string;
  icon: React.ReactNode;
}

const SideBarButtonsItems: SideBarButtons[] = [
  { title: "Home", icon: <MdHomeFilled /> },
  { title: "Explore", icon: <BsSearch /> },
  { title: "Notifications", icon: <BsBell /> },
  { title: "Messages", icon: <BsEnvelope /> },
  { title: "Bookmarks", icon: <PiBookmarkSimpleLight /> },
  { title: "Profile", icon: <FaRegUser /> },
];

export default function Home() {
  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      if (!googleToken) return toast.error(`Google token not found!`);
      const { verifyGoogleToken } = await graphqlClient.request(
        verifyUserGoogleToken,
        {
          token: googleToken,
        }
      );

      toast.success("Verified Success");
      console.log(verifyGoogleToken);

      if (verifyGoogleToken)
        window.localStorage.setItem("__vox_token", verifyGoogleToken);
    },
    []
  );

  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen px-24 text-white">
        <div className="col-span-3 border-r-2 border-gray-600">
          <div className="text-3xl h-fit w-fit text-white mt-2 hover:bg-gray-800 p-4 rounded-full cursor-pointer">
            <BsTwitterX />
          </div>
          <div className="font-semibold mt-4 mx-2 px-2 transition-all cursor-pointer">
            <ul>
              {SideBarButtonsItems.map((item) => (
                <li
                  className="flex items-center text-2xl justify-start gap-5 hover:bg-gray-700 py-3 px-3 rounded-full w-fit"
                  key={item.title}
                >
                  <span>{item.icon}</span>
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
            <div className="pr-2">
              <button className="w-full p-4 rounded-full bg-[#1A8CD8] text-2xl mt-3">
                Post
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-5 h-screen overflow-y-scroll no-scrollbar">
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
        <div className="col-span-4 border-l-2 border-gray-600">
          <div className="bg-gray-800 px-5 mx-5 my-3 py-5 rounded-lg">
            <h1 className="text-2xl font-semibold my-2">New to Vox Populi?</h1>
            <GoogleLogin onSuccess={handleLoginWithGoogle} />
          </div>
        </div>
      </div>
    </div>
  );
}
