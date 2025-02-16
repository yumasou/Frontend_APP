import React from "react";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { createChat } from "../libs/fetcher";
import { useMutation } from "react-query";
function MessageButton({userId}) {
  const navigate = useNavigate();
  const create = useMutation((userIds) => createChat(userIds), {
    onSuccess: (result) => {
        console.log("new chat created")
        navigate(`/chat/${result.id}`)
    },
  });
  return (
    <button
      onClick={() => {
        create.mutate([userId]);
        console.log("am I work")
      }}
    >
      <IoChatbubbleEllipses size={24} className="text-blue-500"/>
    </button>
  );
}

export default MessageButton;
