import React from "react";
import { FaUser } from "react-icons/fa";
import { useApp } from "../ThemedApp";
import { formatRelative } from "date-fns";
function DisplayMessage({ message }) {
  const { auth } = useApp();
//   console.log(message);
  if (message.senderId === auth.id)
    return (
      <div className="flex items-center gap-2 justify-end my-3 mx-2 lg:mx-8 lg:my-5">
        <div className="flex gap-1 lg:gap-2 items-end">
        <div className="font-thin text-xs tracking-tight">{formatRelative(message.createAt,new Date())}</div>
        <div className="overflow-y-auto p-2 bg-blue-400 rounded-s-lg rounded-br-2xl rounded-tr-sm">
          {message.content}
        </div>
        </div>
        <div className="rounded-full p-1 border">
          <FaUser size={30} className="text-blue-900" />
        </div>
      </div>
    );
  else
    return (
      <div className="flex items-center gap-2 justify-start my-3 mx-2 lg:mx-8 lg:my-5">
        <div className="rounded-full p-1 border">
          <FaUser size={30} className="text-blue-900" />
        </div>
        <div className="flex gap-1 lg:gap-2 items-end">
        <div className="overflow-y-auto p-2 bg-blue-400 rounded-e-lg rounded-bl-2xl rounded-tl-sm">
          {message.content}
        </div>
        <div className="font-thin text-xs tracking-tight">{formatRelative(message.createAt,new Date())}</div>
        </div>
      </div>
    );
}

export default DisplayMessage;
