import React from "react";
import { useParams } from "react-router-dom";
import { fetchCommentLikes, fetchPostLikes } from "../libs/fetcher";
import { useQuery } from "react-query";
import FollowButton from "../Components/FollowButton";
import User from "../Components/User";
function Like() {
  const { type, id } = useParams();
  const fetchlike = () => {
    if (type === "post") {
      return fetchPostLikes(id);
    } else return fetchCommentLikes(id);
  };
  const { isLoading, isError, error, data } = useQuery(
    ["likes", id, type],
    fetchlike
  );
// console.log(data)
  
  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>isError</div>;
  return (
    <div className="w-4/5 lg:w-2/6 mx-auto  my-3">
      <h1 className="font-bold text-3xl text-center my-5">Likes</h1>
      {data.likes.map((m) => (
        <User key={m.id} user={m.user}/>
      ))}
    </div>
  );
}

export default Like;
