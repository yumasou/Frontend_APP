import React from "react";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { createChat } from "../libs/fetcher";
import { useMutation } from "react-query";
import { useApp } from "../ThemedApp";
function MessageButton({userId}) {
  const navigate = useNavigate();
  const {auth}=useApp()
  const create = useMutation((userIds) => createChat(userIds), {
    onSuccess: (result) => {
        navigate(`/chat/${result.id}`)
    },
  });
  return (
    <button
      disabled={userId===auth.id}
      onClick={() => {
        create.mutate([userId]);
      }}
    >
      <IoChatbubbleEllipses size={24} className="text-blue-500"/>
    </button>
  );
}

export default MessageButton;
