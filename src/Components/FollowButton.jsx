import React from "react";
import { RiUserFollowFill } from "react-icons/ri";
import { RiUserUnfollowFill } from "react-icons/ri";
import { queryClient, useApp } from "../ThemedApp";
import { postFollow, unFollow } from "../libs/fetcher";
import { useMutation } from "react-query";
function FollowButton({ user }) {
  const follow = useMutation((id) => postFollow({id}), {
    onSuccess: () => {
        queryClient.refetchQueries(["users"])
        queryClient.refetchQueries("followers")
        queryClient.refetchQueries("followings")
        queryClient.invalidateQueries(["likes"]);
    },
  });

  const unfollow = useMutation((id) => unFollow({id}), {
    onSuccess: () => {
        queryClient.refetchQueries(["users"])
        queryClient.refetchQueries("followers")
        queryClient.refetchQueries("followings")
      queryClient.invalidateQueries(["likes"]);
    },
  });

  const { auth } = useApp();
  const isMe = () => {
    return user.id === auth.id;
  };

  const isfollowed = () => {
    return user.followings.find((i) => i.followerId === auth.id);
  };

  if (!auth || isMe()) {
    return <></>;
  }
  return (
    <button
      onClick={(e) => {
        isfollowed() ? unfollow.mutate(user.id) : follow.mutate(user.id);
        e.stopPropagation();
      }}
    >
      {isfollowed() ? (
        <RiUserFollowFill size={24} className="text-green-600" />
      ) : (
        <RiUserUnfollowFill className="text-blue-500" size={24} />
      )}
    </button>
  );
}

export default FollowButton;
