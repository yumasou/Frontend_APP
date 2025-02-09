import React from "react";
import { GoHeartFill } from "react-icons/go";
import { GoComment } from "react-icons/go";
import { formatRelative } from "date-fns";
import { useNavigate } from "react-router-dom";

function NotiItem({data,makeRead}) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        makeRead(data.id)
        navigate(`/posts/${data.postId}`);
      }}
      className={`${
        !data.read ? "ring-2" : "border border-slate-200 opacity-55"
      } flex justify-evenly gap-2 my-3 items-center  p-5 rounded-lg shadow-lg `}
    >
      <div>{data.type==="Comment"?<GoComment className="text-green-600" size={22}/>:<GoHeartFill size={22} className="text-pink-600"/>}</div>
      <div className=" lg:flex-grow flex flex-col lg:flex-row lg:gap-3 gap-1">
        <div ><img src="" alt="" className="w-5 h-5 rounded-full border border-green-600"/></div>
        <p className="text-sm tracking-tight">
          <span className="text-blue-600">
            <button
              onClick={(e) => {
                navigate(`/profile/${data.user.id}`);
                e.stopPropagation();
              }}
              className="font-bold "
            >
              {data.user.name}
            </button>
          </span>
          {data.content}
        </p>
      </div>
      <p className=" text-xs text-green-600 ">
        {formatRelative(data.createAt, new Date())}
      </p>
    </div>
  );
}

export default NotiItem;
