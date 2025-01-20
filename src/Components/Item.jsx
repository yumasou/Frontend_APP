import React from "react";
import { useMutation } from "react-query";
import { formatRelative } from "date-fns";
import { RiDeleteBin5Line } from "react-icons/ri";
import { queryClient } from "../ThemedApp";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Item({ data }) {
  const api = import.meta.env.VITE_API;
  const nevigate = useNavigate();

  const deletePost = async () => {
    await axios.delete(`${api}/content/posts/${data.id}`);
  };

  const remove = useMutation(() => deletePost(), {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
      nevigate('/')
    },
  });
  
  return (
   data && <div className=" border shawdow-lg rounded-lg p-6 ">
      <div className="flex justify-between leading-6">
        <div className="flex  gap-2">
          <div>
            <img src="" alt="" className="rounded-full h-5 w-5 border border-green-800" />
          </div>
          <button
            onClick={() => nevigate(`/profile/${data.user.id}`)}
            className="font-bold text-blue-600 leading-5"
          >
            {data.user.name}
          </button>
        </div>
        <button onClick={() => remove.mutate()}>
          <RiDeleteBin5Line className="fill-red-600"/>
        </button>
      </div>
      <p className=" indent-6 text-sm font-thin text-blue-500">
        {formatRelative(data.createAt, new Date())}
      </p>
      <p className="tracking-wide leading-8 py-5">{data.content}</p>
    </div>
  );
}

export default Item;
