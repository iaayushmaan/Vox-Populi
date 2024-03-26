import React, { useCallback } from "react";
import { BsBell, BsEnvelope, BsSearch, BsTwitterX } from "react-icons/bs";
import { MdHomeFilled } from "react-icons/md";
import { PiBookmarkSimpleLight } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import FeedCard from "@/components/FeedCard";
import toast from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { IoImageOutline } from "react-icons/io5";

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
  const { user } = useCurrentUser();
  const queryClient = useQueryClient();

  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
  }, []);

  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      if (!googleToken) return toast.error(`Google token not found`);

      const { verifyGoogleToken } = await graphqlClient.request(
        verifyUserGoogleTokenQuery,
        { token: googleToken }
      );

      toast.success("Verified Success");
      console.log(verifyGoogleToken);

      if (verifyGoogleToken)
        window.localStorage.setItem("__vox_token", verifyGoogleToken);

      await queryClient.invalidateQueries(["curent-user"]);
    },
    [queryClient]
  );
  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen px-24 text-white">
        <div className="col-span-3 border-r-2 border-gray-600 relative">
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
          {user && (
            <div className="absolute bottom-5 flex gap-2 items-center px-3 py-2 bg-slate-800 rounded-full">
              {user && user.profileImageURL && (
                <Image
                  className="rounded-full"
                  src={user?.profileImageURL}
                  alt="user-image"
                  height={50}
                  width={50}
                />
              )}
              <div>
                <h3 className="txt-3xl">
                  {user.firstName} {user.lastName}
                </h3>
              </div>
            </div>
          )}
        </div>
        <div className="col-span-5 h-screen overflow-y-scroll no-scrollbar">
          <div className="grid grid-cols-12 gap-3 border border-l-0 border-r-0 border-b-0 border-gray-600 p-5  hover:bg-gray-800 transition-all cursor-pointer">
            <div className="col-span-1 ">
              {user && user.profileImageURL && (
                <Image
                  src={user?.profileImageURL}
                  alt="user-image"
                  height={50}
                  width={50}
                  className="rounded-full"
                />
              )}
            </div>
            <div className="col-span-11">
              <textarea
                className="w-full text-xl bg-transparent border-none border-slate-700"
                placeholder="What's on your mind?"
                rows={4}
              ></textarea>
              <div className="mt-2 flex justify-between">
                <IoImageOutline
                  onClick={handleSelectImage}
                  className="text-xl"
                />
                <button className="py-2 rounded-full bg-[#1A8CD8] text-sm px-5">
                  Post
                </button>
              </div>
            </div>
          </div>
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
        <div className="col-span-4 border-l-2 border-gray-600">
          {!user && (
            <div className="bg-gray-800 px-5 mx-5 my-3 py-5 rounded-lg">
              <h1 className="text-2xl font-semibold my-2">
                New to Vox Populi?
              </h1>
              <GoogleLogin onSuccess={handleLoginWithGoogle} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
