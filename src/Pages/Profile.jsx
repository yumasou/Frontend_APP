import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import PostItem from "../Components/PostItem";
import { useMutation } from "react-query";
import { queryClient } from "../ThemedApp";
function Profile() {
  const { id } = useParams();
  const api = import.meta.env.VITE_API;
  const fetchUser = async () => {
    const res = await axios.get(`${api}/users/${id}`);
    return res.data;
  };
  const { isLoading, isError, error, data } = useQuery("users", fetchUser);

  const deletePost = async (id) => {
    await axios.delete(`${api}/content/posts/${id}`);
  };

  const remove = useMutation((id) => deletePost(id), {
    onMutate: (id) => {
      queryClient.cancelQueries("users");
      queryClient.setQueryData("users", (old) => ({
        ...old,
        posts: old.posts.filter((m) => m.id !== id),
      }));
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
    return <div>Error</div>;
  }
  return (
    <div className="w-4/5 sm:w-2/6 mx-auto my-5">
      <div className="bg-gray-400 w-full h-48 rounded-lg"></div>
      <div className="-mt-16 space-y-2 mb-5">
        <div
          className="w-28 h-28 <div className='w-28 h-28 mx-auto rounded-full bg-slate-700'></div>
            <h1 >name</h1> rounded-full bg-slate-700"
        ></div>
        <h1 className="justify-self-center text-xl font-bold">{data.name}</h1>
        <p className="justify-self-center text-green-400">{data.bio}</p>
      </div>
      <div>
        <h1 className="font-bold my-3 texl-xl indent-1">Posts..</h1>
        {data.posts &&
          data.posts.map((m) => (
            <PostItem
              createdAt={m.createAt}
              id={m.id}
              userId={m.userId}
              user={data.name}
              content={m.content}
              key={m.id}
              remove={remove.mutate}
            />
          ))}
      </div>
    </div>
  );
}

export default Profile;
