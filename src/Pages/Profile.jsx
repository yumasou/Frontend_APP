import React, { useState } from "react";
import { useQuery } from "react-query";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { MdOutlineLibraryAddCheck } from "react-icons/md";
import { useParams } from "react-router-dom";
import PostItem from "../Components/PostItem";
import { useMutation } from "react-query";
import { queryClient } from "../ThemedApp";
import { fetchUser, deletePost } from "../libs/fetcher";
import { useApp } from "../ThemedApp";
function Profile() {
  const { auth } = useApp();
  const { id } = useParams();
  const [followed, setFollow] = useState(true);
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
    <div className="w-4/5 sm:w-2/6 mx-auto my-5">
      <div className="bg-gray-400 w-full h-48 rounded-lg"></div>
      <div className="-mt-16 space-y-2 mb-5">
        <div className=" w-28 h-28 mx-auto rounded-full bg-slate-700"></div>
        <h1 className="justify-self-center text-xl font-bold">{data.name}</h1>
        <p className="justify-self-center text-green-400">{data.bio}</p>
        <div className="flex mx-auto items-center justify-evenly">
          <div className="flex gap-1">
            <div className="text-blue-600">{data._count.followings}</div>
            <div>Following</div>
          </div>
          <div className="flex gap-1">
            <div className="text-blue-600">{data._count.followers}</div>
            <div>Follower</div>
          </div>
          <div>
            {" "}
            {data.id === auth.id ? (
              ""
            ) : (
              <button>
                {(followed)?
                <MdOutlineLibraryAddCheck
                  size={22}
                  stroke="fill"
                  className="text-green-600"
                />
                :<MdOutlineLibraryAdd size={22} className="text-blue-600" />
                }</button>
            )}
          </div>
        </div>
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
