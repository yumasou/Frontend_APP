import { RiDeleteBin5Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { formatRelative } from "date-fns";
function PostItem({ createdAt, content, user, remove, id, userId }) {
  const nevigate = useNavigate();
  return (
    <div
      onClick={() => {
        nevigate(`/posts/${id}`);
      }}
      className="shadow-lg cursor-pointer rounded-lg justify-between  mx-auto  min-w-full space-y-5 px-8 py-5 border hover:ring-1"
    >
      <div className="flex justify-between">
        <div className="text-sm">{formatRelative(createdAt, new Date())}</div>
        <div>
          <a
            href="#"
            onClick={() => remove(id)}
            style={{ textDecoration: "none" }}
          >
            <RiDeleteBin5Line />
          </a>
        </div>
      </div>
      <div className=" leading-8 tracking-wide text-pretty indent-0">
        {content}
      </div>
      <div className="flex gap-2 ">
        <div>
          <img src="" alt="" className="rounded-full w-5 h-5" />
        </div>
        <button
          onClick={() => nevigate(`/profile/${userId}`)}
          className="font-bold"
        >
          {user}
        </button>
      </div>
    </div>
  );
}
export default PostItem;
