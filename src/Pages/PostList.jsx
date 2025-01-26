import React from "react";

import { useQuery, useMutation } from "react-query";
import { queryClient } from "../ThemedApp";
import PostItem from "../Components/PostItem";
import { fetchPost, deletePost } from "../libs/fetcher";

function PostList() {
  const { isLoading, isError, error, data } = useQuery(["posts"], fetchPost,);
  // console.log(data)
  const remove = useMutation((id) => deletePost(id), {
    onMutate: async (id) => {
      queryClient.cancelQueries(["posts"]);
      const perviousposts = queryClient.getQueryData(["posts"]);
      queryClient.setQueryData(["posts"], (old) => {
        return old.filter((item) => item.id !== id);
      });
      return { perviousposts };
    },
    onError: (error, id, context) => {
      queryClient.setQueryData(["posts"], context.perviousposts);
    },
    
  });

  if (isLoading) {
    return <div>Loading</div>;
  }
  if (isError) {
    return <div>Have Problem</div>;
  }
  return (
    <div className="w-5/6 sm:w-2/6 mx-auto space-y-5 my-5">
      {data.map((m) => (
        <PostItem
          createdAt={m.createAt}
          id={m.id}
          userId={m.userId}
          user={m.user.name}
          content={m.content}
          key={m.id}
          PostLikes={m._count.PostLikes}
          remove={remove.mutate}
        />
      ))}
    </div>
  );
}

export default PostList;
