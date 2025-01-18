import { formatRelative } from "date-fns";
import React from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { queryClient } from "../ThemedApp";
import { useMutation } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Comment({ comment}) {
  const navigate=useNavigate()
  const api = import.meta.env.VITE_API;
  const removeComment = async (id) => {
    console.log(id)
    await axios.delete(`${api}/content/comments/${id}`);
  };
  const remove = useMutation(removeComment, {
    onMutate: (id) => {
      queryClient.cancelQueries("comments");
      queryClient.setQueryData("comments", (old) =>{
        console.log(old)
        return ({...old,comments:old.comments.filter(m=>m.id!==id)})
      }    
     )
    },
  });
  return (
    <div className="flex flex-col rounded-lg p-5 tracking-wide leading-8">
      <div className="flex justify-between">
        
        <div onClick={()=>navigate(`/profile/${comment.userId}`)} className="font-bold flex leading-6 gap-1 cursor-pointer"><img src="" alt=""  className="h-5 w-5 rounded-full" /><div>{comment.user.name}</div></div>

        <button onClick={() => remove.mutate(comment.id)}> <RiDeleteBin5Line/></button>
      </div>
      <div className=" text-sm leading-9 tracking-wide ">{comment.content}</div>
      <div className=" align-bottom text-sm font-thin">
        {formatRelative(comment.createAt, new Date())}
      </div>
    </div>
  );
}

export default Comment;
