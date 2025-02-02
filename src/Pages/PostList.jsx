import React, { useState } from "react";
import { useApp } from "../ThemedApp";
import { useQuery, useMutation } from "react-query";
import { queryClient } from "../ThemedApp";
import PostItem from "../Components/PostItem";
import { fetchPost, deletePost, fetchFollowingPosts } from "../libs/fetcher";

function PostList() {
  const { auth } = useApp();

  const [lastPost, setLastPost] = useState(true);
  const { isLoading, isError, error, data } = useQuery(
    ["posts", lastPost],
    () => {
      if (lastPost) {
        return fetchPost();
      } else {
        return fetchFollowingPosts();
      }
    }
  );
  console.log(lastPost);
  const remove = useMutation((id) => deletePost(id), {
    onMutate: async (id) => {
      queryClient.cancelQueries(["posts"]);
      const perviousposts = queryClient.getQueryData(["posts", lastPost]);
      queryClient.setQueryData(["posts", lastPost], (old) => {
        return old.filter((item) => item.id !== id);
      });
      return { perviousposts };
    },
    onError: (error, id, context) => {
      queryClient.setQueryData(["posts", lastPost], context.perviousposts);
    },
  });

  if (isLoading) {
    return <div>Loading</div>;
  }
  if (isError) {
    return <div>Have Problem</div>;
  }
  return (
    <div className="w-5/6 lg:w-2/6 mx-auto space-y-5 my-5">
      <div className="mx-auto text-center">
        <button
          disabled={!lastPost && auth}
          onClick={() => {
            setLastPost(false);
          }}
          className="px-2 text-violet-600"
        >
          {" "}
          Following
        </button>
        |
        <button
          disabled={lastPost}
          onClick={() => {
            setLastPost(true);
          }}
          className="px-2 text-purple-500"
        >
          Last update
        </button>
      </div>
      {data.map((m) => (
        <PostItem key={m.id} item={m} remove={remove.mutate} />
      ))}
    </div>
  );
}

export default PostList;
