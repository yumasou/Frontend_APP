import React, { useMemo, useEffect, useRef } from "react";
import { FaUser } from "react-icons/fa";
import { useInfiniteQuery, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import DisplayMessage from "./DisplayMessage";
import SentMessage from "./SentMessage";
import { useApp } from "../ThemedApp";
import { fetchMassages } from "../libs/fetcher";
function Conversation() {
  const { id } = useParams();
  const messageContainerRef = useRef(null);
  const isAtBottom = useRef(true);
  const viewpoint = useRef(1603);
  const navigate = useNavigate();
  const { auth } = useApp();
  const chats = useQuery({
    queryKey: "chats",
    queryFn: () => Promise.resolve(null),
    enabled: false,
  });

  const { data, error, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      ["massages", parseInt(id)],
      async ({ pageParam = 0 }) => {
        return await fetchMassages({ chatId: id, skip: pageParam, limit: 30 });
      },
      {
        getNextPageParam: (lastPage, allPages) => {
          if (lastPage?.length === 30) {
            return lastPage?.length * allPages?.length;
          } else return undefined;
        },
      }
    );

  const handleScroll = () => {
    if (messageContainerRef.current.scrollTop === 0 && hasNextPage) {
      viewpoint.current = 1300

       
      isAtBottom.current =
        messageContainerRef.scrollHeight - 10 <=
        messageContainerRef.current.scrollTop +
          messageContainerRef.current.clientHeight;
      fetchNextPage();
    }
  };


  useEffect(() => {
    if (messageContainerRef.current && isAtBottom.current) {
      messageContainerRef.current.scrollTo({
        top: messageContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    } else {
      messageContainerRef.current.scrollTop=viewpoint.current
      // messageContainerRef.current.scrollTo({
      //   top: viewpoint.current,
      //   behavior: "smooth",
      // });
    }
  }, [data,viewpoint]);



  const [chat] = chats?.data?.filter((m) => m.id === parseInt(id)) || [];
  const [receiver] =
    chat?.users?.filter((m) => m.id !== parseInt(auth.id)) || [];

  return (
    <div
      onScroll={() => handleScroll()}
      className="pb-20 overflow-y-auto h-[calc(100vh-66px)]"
      ref={messageContainerRef}
    >
      <div className="flex items-center gap-2  bg-slate-300 dark:bg-slate-700  sticky top-0 py-4 opacity-100 ">
        <FaUser
          size={30}
          className="ms-2 text-blue-900 p-1 rounded-full border"
        />
        <button
          onClick={() => {
            navigate(`/profile/${receiver.id}`);
          }}
          className="text-blue-600 font-bold text-xl"
        >
          {receiver?.name}
        </button>
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
