import { RiDeleteBin5Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { formatRelative } from "date-fns";
import LikeButton from "./LikeButton";
import CommentButton from "./CommentButton";
function PostItem({ remove, item }) {
  const nevigate = useNavigate();
  return (
    item && (
      <div
        onClick={() => {
          nevigate(`/posts/${item.id}`);
        }}
        className="shadow-lg cursor-pointer rounded-lg justify-between my-4 mx-auto  min-w-full space-y-5 px-8 py-5 border hover:ring-1"
      >
        <div className="flex justify-between">
          <div className="text-sm text-green-500">
            {formatRelative(item.createAt, new Date())}
          </div>
          <div>
            <button
              onClick={(e) => {
                remove(item.id);
                e.stopPropagation();
                nevigate("/");
              }}
              style={{ textDecoration: "none" }}
            >
              <RiDeleteBin5Line className=" fill-red-600" />
            </button>
          </div>
        </div>
        <div className=" leading-8 tracking-normal text-pretty indent-0">
          {item.content}
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-2  items-center">
            <div>
              <img
                src=""
                alt=""
                className="rounded-full border border-green-800 w-5 h-5"
              />
            </div>
            <button
              onClick={(e) => {
                nevigate(`/profile/${item.userId}`);
                e.stopPropagation();
              }}
              className="font-bold text-blue-600 tracking-tight "
            >
              {item.user.name}
            </button>
          </div>
          <div className="flex gap-1 items-center justify-between">
            <LikeButton item={item} />
            <CommentButton count={item._count.comments}/>
          </div>
        </div>
      </div>
    )
  );
}
export default PostItem;
