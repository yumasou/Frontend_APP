import React, { } from "react";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { queryClient } from "../ThemedApp";
import { useMutation } from "react-query";
import { useApp } from "../ThemedApp";
import { postCommentLike,postPostLike,unlikeComment,unlikePost } from "../libs/fetcher";
import { useNavigate } from "react-router-dom";
function LikeButton({ item, comment }) {
  const navigate=useNavigate()
  // console.log(item, comment);
  const { auth } = useApp();
  const liked = () => {
    if (!auth) return false;
    if (item && !item.postLikes && comment && !comment.commentLikes)
      return false;
    if (
      (item && item.postLikes.find((like) => like.userId === auth.id)) ||
      (comment && comment.commentLikes.find((like) => like.userId === auth.id))
    )
      return true;
  };


  const removeCommentLike = useMutation((id) => unlikeComment({id}), {
    onSuccess: () => {
      queryClient.refetchQueries(["posts"]);
      queryClient.refetchQueries(["comments"]);
      queryClient.refetchQueries(["users"]);
    },
  });

  const removePostLike = useMutation((id) => unlikePost({id}), {
    onSuccess: () => {
      queryClient.refetchQueries(["posts"]);
      queryClient.refetchQueries(["comments"]);
      queryClient.refetchQueries(["users"]);
    },
  });
  const addPostLike = useMutation((id) => postPostLike({id}), {
    onSuccess: () => {
      queryClient.refetchQueries(["posts"]);
      queryClient.refetchQueries(["comments"]);
      queryClient.refetchQueries(["users"]);
    },
  });

  const addCommentLike=useMutation((id)=>postCommentLike({id}),{
    onSuccess:()=>{
        queryClient.refetchQueries(["posts"])
        queryClient.refetchQueries(["comments"])
        queryClient.refetchQueries(["users"]);
    }
})

  return (
   (item || comment) && <div className="flex gap-1 items-center">
      <button 
      onClick={e=>{liked()?
        (comment)?removeCommentLike.mutate(comment.id):removePostLike.mutate(item.id)
        :
        (comment)?addCommentLike.mutate(comment.id):addPostLike.mutate(item.id)
        e.stopPropagation()
    }

  }
      >
        {liked() ? (
          <GoHeartFill className="text-pink-600" size={20} />
        ) : (
          <GoHeart size={20} className="text-pink-600" />
        )}
      </button>
      <button onClick={e=>{
        if(item){navigate(`/likes/post/${item.id}`)}
        if(comment) {navigate(`/likes/comment/${comment.id}`)}
        e.stopPropagation()
      }} className="inline-block text-green-600">
        {(item && item._count.postLikes) ||
          (comment && comment._count.commentLikes)}
      </button>
    </div>
  );
}

export default LikeButton;
