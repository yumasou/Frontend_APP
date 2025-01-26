import { formatRelative } from "date-fns";
import React,{useState} from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
function Comment({ comment,remove }) {
const [liked, setLike] = useState(true);
  const navigate = useNavigate();
console.log(comment)
  return (
    <div className="flex flex-col rounded-lg p-5 tracking-wide leading-8">
      <div className="flex justify-between">
        <div
          onClick={() => navigate(`/profile/${comment.userId}`)}
          className="font-bold flex leading-6 gap-2 cursor-pointer"
        >
          <img
            src=""
            alt=""
            className="h-5 w-5 rounded-full border border-green-800"
          />
          <div className=" text-blue-800">{comment.user.name}</div>
        </div>

        <button onClick={() => remove(comment.id)}>
          {" "}
          <RiDeleteBin5Line className="fill-red-600" />
        </button>
      </div>
      <div className=" text-sm leading-9 tracking-wide ">{comment.content}</div>
      <div className="flex justify-between align-bottom text-sm ">
        <div className="font-thin text-blue-600">{formatRelative(comment.createAt, new Date())}</div>
        <div className="flex gap-1 items-center">
          <button>{liked ? <GoHeartFill fill="green" size={20}/> : <GoHeart size={20} />}</button>
          <span className="inline-block text-green-600">{comment._count.commentLikes}</span>{" "}
        </div>
      </div>
    </div>
  );
}

export default Comment;
