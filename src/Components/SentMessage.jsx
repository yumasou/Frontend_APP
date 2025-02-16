import React, { useRef } from "react";
import { IoSend } from "react-icons/io5";
import { queryClient, useApp } from "../ThemedApp";
import { useMutation } from "react-query";
import { sendMassage } from "../libs/fetcher";
function SentMessage({ chatId }) {
  const massageRef = useRef();
  const handlesend = () => {
    const content = massageRef.current.value;
    send.mutate({ chatId, content });
  };
  const send = useMutation((data) => sendMassage(data), { onSuccess:()=>{
    queryClient.invalidateQueries(["massages",parseInt(chatId)])
  } });
  return (
    <div className="fixed lg:w-9/12 w-full bottom-0  border border-slate-400   py-5 bg-slate-200 dark:bg-slate-700">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handlesend()
          massageRef.current.value=""
        }}
        className="flex "
      >
        <input
          ref={massageRef}
          className="flex-grow py-2 bg-slate-300 rounded-e-md text-slate-700 focus:outline-none indent-1 line-clamp-1 overflow-x-auto"
          type="text"
        />
        <button type="submit" className="mx-4">
          <IoSend size={35} className="text-blue-600" />
        </button>
      </form>
    </div>
  );
}

export default SentMessage;
