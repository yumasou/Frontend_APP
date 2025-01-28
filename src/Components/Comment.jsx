import { formatRelative } from "date-fns";
import React,{useState} from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

import LikeButton from "./LikeButton";
function Comment({ comment,remove }) {

  const navigate = useNavigate();

  return (
   comment && <div className="flex flex-col rounded-lg p-5 tracking-wide leading-8">
      <div className="flex justify-between">
        <div
          onClick={() => navigate(`/profile/${comment.userId}`)}
          className="font-bold flex leading-6 gap-2 cursor-pointer"
        >
          <img
            src=""
            alt=""
            className="h-5 w-5 rounded-full border border-green-800"
          />
          <div className=" text-blue-800">{comment.user.name}</div>
        </div>

        <button onClick={() => remove(comment.id)}>
          {" "}
          <RiDeleteBin5Line className="fill-red-600" />
        </button>
      </div>
      <div className=" text-sm leading-9 tracking-wide ">{comment.content}</div>
      <div className="flex justify-between align-bottom text-sm ">
        <div className="font-thin text-blue-600">{formatRelative(comment.createAt, new Date())}</div>
        <LikeButton comment={comment}/>
      </div>
    </div>
  );
}

export default Comment;
