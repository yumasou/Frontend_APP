import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchChats } from "../libs/fetcher";
import ChatItem from "../Components/ChatItem";
function Chat() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Check if we are inside a chat
  const isInChat = location.pathname.startsWith("/chat/");

  useEffect(() => {
    if (isInChat) {
      setIsSidebarOpen(!isInChat);
    }
  }, [isInChat]);

  const { data, error, isloading, isError } = useQuery("chats", fetchChats);
  // console.log(data && data[0])
  if (isloading) return <div>Loading</div>;
  if (isError) return <div>Error</div>;
  return (
    <div className="flex">
      <div
        className={`fixed h-[calc(100vh-66px)] gap-2 inset-0  z-50 transition-transform duration-300 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:sticky top-[66px] lg:translate-x-0 lg:w-3/12 border-r`}
      >
        <div className="h-full  overflow-y-auto px-4">
          {data?.map((m) => (
            <ChatItem key={m.id} chat={m} />
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div
        className={`flex-1 ${
          !isSidebarOpen ? "block" : "hidden"
        } lg:block lg:col-span-10 flex flex-col `}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default Chat;
