import React, { useMemo, useEffect, useRef } from "react";
import { FaUser } from "react-icons/fa";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import DisplayMessage from "./DisplayMessage";
import SentMessage from "./SentMessage";
import { useApp } from "../ThemedApp";

function Conversation() {
  const navigate=useNavigate()
  const { auth } = useApp();
  const chats = useQuery({
    queryKey: "chats",
    queryFn: () => Promise.resolve(null),
    enabled: false,
  });
  const messageContainerRef = useRef(null);
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ["massages", parseInt(id)],
    queryFn: () => Promise.resolve(null),
    enabled: false,
  });
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [data]);

  const  [chat]  =  chats?.data?.filter((m) => m.id === parseInt(id)) || [];
  const [receiver ]= chat?.users?.filter(m=>m.id!==parseInt(auth.id)) || [];

  return (
    <div
      className="pb-20 overflow-y-auto h-[calc(100vh-66px)]"
      ref={messageContainerRef}
    >
      <div className="flex items-center gap-2  bg-slate-300 dark:bg-slate-700  sticky top-0 py-4 opacity-100 ">
        <FaUser size={30} className="ms-2 text-blue-900 p-1 rounded-full border"/><button onClick={()=>{
          navigate(`/profile/${receiver.id}`)
        }} className="text-blue-600 font-bold text-xl">{receiver?.name}</button>
      </div>
      {data && data.pages && data.pages.length > 0 && (
        <div className="overflow-auto">
          {data.pages
            .flat()
            .slice()
            .reverse()
            .map((m) => (
              <DisplayMessage key={m.id} message={m} />
            ))}
        </div>
      )}
      <div className="">
        <SentMessage chatId={id} />
      </div>
    </div>
  );
}

export default Conversation;
