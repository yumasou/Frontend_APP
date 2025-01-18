import React from "react";
import { useMutation } from "react-query";
import { formatRelative } from "date-fns";
import { RiDeleteBin5Line } from "react-icons/ri";
import { queryClient } from "../ThemedApp";
import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";
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
  console.log(data);
  return (
    <div className=" border shawdow-lg rounded-lg p-6 ">
      <div className="flex justify-between leading-6">
        <div className="flex  gap-2">
          <div>
            <img src="" alt="" className="rounded-full h-5 w-5 " />
          </div>
          <button
            onClick={() => nevigate(`/profile/${data.user.id}`)}
            className="font-bold "
          >
            {data.user.name}
          </button>
        </div>
        <button onClick={() => remove.mutate()}>
          <RiDeleteBin5Line />
        </button>
      </div>
      <p className=" indent-6 text-sm font-thin ">
        {formatRelative(data.createAt, new Date())}
      </p>
      <p className="tracking-wide leading-8 py-5">{data.content}</p>
    </div>
  );
}

export default Item;
