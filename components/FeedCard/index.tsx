import React from "react";
import Image from "next/image";
import { FaRegComment, FaRegHeart } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { MdOutlineFileUpload } from "react-icons/md";

const FeedCard = () => {
  return (
    <div>
      <div className="grid grid-cols-12 gap-3 border border-l-0 border-r-0 border-b-0 border-gray-600 p-5  hover:bg-gray-800 transition-all cursor-pointer">
        <div className="col-span-1 ">
          <Image
            src="https://avatars.githubusercontent.com/u/116517217?v=4"
            alt="user-image"
            height={50}
            width={50}
            className="rounded-full"
          />
        </div>
        <div className="col-span-11">
          <h3 className="text-xl font-semibold">Aayushmaan Tawer</h3>
          <p>
            The JOIDES Resolution ( @TheJR ), a research ship that has been used
            to collect thousands of cores from the ocean floor to answer
            questions about the history and future of Earth, will be retired at
            the end of 2024. Next for scientific ocean drilling?
          </p>
          <div className="flex justify-between mt-3 text-xl">
            <div>
              <FaRegComment />
            </div>
            <div>
              <BiRepost />
            </div>
            <div>
              <FaRegHeart />
            </div>
            <div>
              <MdOutlineFileUpload />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
