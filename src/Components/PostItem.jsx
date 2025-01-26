import { RiDeleteBin5Line } from "react-icons/ri";
import { data, useNavigate } from "react-router-dom";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { formatRelative } from "date-fns";
import { useState } from "react";
function PostItem({ createdAt, content, user, remove, id, userId, PostLikes }) {
  const nevigate = useNavigate();
  const [liked, setLike] = useState(true);
  return (
    <div
      onClick={() => {
        nevigate(`/posts/${id}`);
      }}
      className="shadow-lg cursor-pointer rounded-lg justify-between my-4 mx-auto  min-w-full space-y-5 px-8 py-5 border hover:ring-1"
    >
      <div className="flex justify-between">
        <div className="text-sm text-blue-500">
          {formatRelative(createdAt, new Date())}
        </div>
        <div>
          <button
            onClick={(e) => {
              remove(id);
              e.stopPropagation();
              nevigate("/");
            }}
            style={{ textDecoration: "none" }}
          >
            <RiDeleteBin5Line className=" fill-red-600" />
          </button>
        </div>
      </div>
      <div className=" leading-8 tracking-wide text-pretty indent-0">
        {content}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2 ">
          <div>
            <img
              src=""
              alt=""
              className="rounded-full border border-green-800 w-5 h-5"
            />
          </div>
          <button
            onClick={(e) => {
              nevigate(`/profile/${userId}`);
              e.stopPropagation();
            }}
            className="font-bold text-blue-600"
          >
            {user}
          </button>
        </div>
        <div className="flex gap-1 items-center">
          <button>{liked ? <GoHeartFill fill="green" size={20}/> : <GoHeart size={20} />}</button>
          <span className="inline-block text-green-600">{PostLikes}</span>{" "}
        </div>
      </div>
    </div>
  );
}
export default PostItem;
