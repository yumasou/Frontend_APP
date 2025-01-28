import React from "react";
import { GoComment } from "react-icons/go";
function CommentButton({count}) {
  return (
    <div className="flex gap-1 items-center justify-between">
      <GoComment size={20} className="text-cyan-700"/>
      <div className="inline-block text-green-600">{count}</div>
    </div>
  );
}

export default CommentButton;
