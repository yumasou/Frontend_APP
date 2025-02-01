import React from "react";
import FollowButton from "./FollowButton";
import { useNavigate } from "react-router-dom";
function User({ user }) {

  const nevigate = useNavigate();
  return (
    <div className="flex justify-between  py-6 sm:py-7 my-3 frist:mt-3 last:mb-3 border  px-3 sm:px-6 shadow-md rounded-lg items-center">
      <div className="flex gap-1 sm:gap-2 items-center">
        <div>
          <img
            src=""
            alt=""
            className="sm:h-10 sm:w-10 h-8 w-8 border border-green-600 rounded-full bg-gray-700"
          />
        </div>
        <div className=" tracking-tight md:tracking-normal">
          <button
            onClick={(e) => {
              nevigate(`/profile/${user.id}`);
              e.stopPropagation();
            }}
            className="font-bold text-blue-600"
          >
            {user.name}
          </button>
          <div className="text-sm tracking-tighter">{user.bio}</div>
        </div>
      </div>
      <div>
        <FollowButton user={user} />
      </div>
    </div>
  );
}

export default User;
