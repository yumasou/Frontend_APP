import React, { useMemo, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useApp } from "../ThemedApp";
import { useInfiniteQuery, useMutation, useQuery } from "react-query";
import { fetchMassages, makeMessagesRead } from "../libs/fetcher";
import { formatRelative } from "date-fns";
import { useNavigate } from "react-router-dom";
import { queryClient } from "../ThemedApp";
function ChatItem({ chat }) {
  const navigate = useNavigate();
  const { auth } = useApp();
  const id = chat.id;
  // console.log(chat.lastMessageId);
  const receiver = useMemo(
    () => chat?.users.find((m) => m.id !== auth.id),
    [chat, auth]
  );
  const { data, error, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      ["massages", parseInt(id)],
      async ({ pageParam = 0 }) => {
        return await fetchMassages({ chatId: id, skip: pageParam, limit: 30 });
      },
      {
        getNextPageParam: (lastPage, allPages) => {
          return lastPage.length === 30 ? allPages.length * 30 : undefined;
        },
      }
    );

  const Read = useMutation((data) => makeMessagesRead(data), {
    onSuccess: (result) => {
      // console.log("read update",result);
      queryClient.invalidateQueries("chats");
      queryClient.invalidateQueries(["massages", parseInt(chat.id)]);
    },
  });
  const make = ({ chatId, readId }) => {
    if (
      !(chat.lastMessageId === data?.pages[0][0]?.id) &&
      !(data.pages[0][0].senderId === auth.id)
    ) {
      Read.mutate({ chatId, readId });
    } else return false;
  };

  return (
    chat &&
    receiver &&
    data &&
    data.pages.length && (
      <div
        onClick={() => {
          navigate(`/chat/${chat.id}`);
          make({ chatId: chat.id, readId: data.pages[0][0].id });
        }}
        className={` first:mt-3 flex justify-between mx-auto py-2 items-center shadow-lg rounded-md my-1 border border-slate-200`}
      >
        <div className="mx-2">
          <FaUser className="w-8 h-8 rounded-full text-blue-900" />
        </div>
        <div className="flex flex-col flex-grow mx-2 gap-2">
          <h1 className="text-blue-600 font-bold ">{receiver.name}</h1>
          <div className="text-ellipsis overflow-hidden line-clamp-1 text-sm">
            {data.pages && data.pages[0][0] ? data.pages[0][0].content : ""}
          </div>
        </div>
        <div className="flex flex-col mr-2 items-end flex-shrink-0 gap-2">
          {!chat.lastReadMessageId ||
          chat.lastReadMessageId === data?.pages[0][0]?.id ||
          data?.pages[0][0]?.senderId === auth.id ? (
            <div></div>
          ) : (
            <div className="px-2 border rounded-full bg-red-500">!</div>
          )}
          {/*  */}
          <div className="text-xs">
            {data.pages[0][0]
              ? formatRelative(data.pages[0][0].createAt, new Date())
              : ""}
          </div>
        </div>
      </div>
    )
  );
}

export default ChatItem;
