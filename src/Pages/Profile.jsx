import React, { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import PostItem from "../Components/PostItem";
import { useMutation } from "react-query";
import { queryClient } from "../ThemedApp";
import { fetchUser, deletePost } from "../libs/fetcher";
import FollowButton from "../Components/FollowButton";
import MessageButton from "../Components/MessageButton";
function Profile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isLoading, isError, error, data } = useQuery("users", () =>
    fetchUser(id)
  );

  const remove = useMutation((id) => deletePost(id), {
    onMutate: (id) => {
      queryClient.cancelQueries("users");
      queryClient.setQueryData("users", (old) => ({
        ...old,
        posts: old.posts.filter((m) => m.id !== id),
      }));
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  if (isLoading) {
    return <div>Loading</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }
  return (
    <div className="w-4/5 lg:w-2/6 mx-auto my-5">
      <div className="bg-gray-400 w-full h-48 rounded-lg"></div>
      <div className="-mt-16 space-y-2 mb-5">
        <div className=" w-28 h-28 mx-auto rounded-full bg-slate-700"></div>
        <h1 className="justify-self-center text-xl font-bold">{data.name}</h1>
        <p className="justify-self-center text-green-400">{data.bio}</p>
        <div className="flex mx-auto items-center justify-evenly">
          <div
            className="flex gap-1"
            onClick={() => {
              navigate(`/followers/user/${id}`);
            }}
          >
            <div className="text-blue-600">{data._count.followings}</div>
            <div>Follower</div>
          </div>
          <div
            onClick={() => {
              navigate(`/followings/user/${id}`);
            }}
            className="flex gap-1"
          >
            <div className="text-blue-600">{data._count.followers}</div>
            <div>Following</div>
          </div>
          <div>
            <MessageButton userId={data.id} />
          </div>
          <div>
            <FollowButton user={data} />
          </div>
        </div>
      </div>
      <div>
        <h1 className="font-bold my-3 texl-xl indent-1">Posts..</h1>
        {data.posts &&
          data.posts.map((m) => (
            <PostItem key={m.id} item={m} remove={remove.mutate} />
          ))}
      </div>
    </div>
  );
}

export default Profile;
