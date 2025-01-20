import React from "react";
import axios from "axios";
import { useQuery, useMutation } from "react-query";
import { queryClient } from "../ThemedApp";
import PostItem from "../Components/PostItem";
import { fetchPost } from "../libs/fetcher";
function PostList() {
  const api = import.meta.env.VITE_API;

 
  const deletePost = async (id) => {
    await axios.delete(`${api}/content/posts/${id}`);
  };

  const { isLoading, isError, error, data } = useQuery("posts", fetchPost);
  const remove = useMutation((id) => deletePost(id), {
    onMutate: (id) => {
      queryClient.cancelQueries("posts");
      queryClient.setQueryData("posts", (old) => {
        return old.filter((item) => item.id !== id);
      });
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
          remove={remove.mutate}
        />
      ))}
    </div>
  );
}

export default PostList;
