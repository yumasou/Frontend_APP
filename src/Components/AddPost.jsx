import React, { useRef } from "react";
import { useApp } from "../ThemedApp";
import { useMutation, useQuery } from "react-query";
import { fetchPost, postPost } from "../libs/fetcher";

function AddPost(props) {
  const contentRef = useRef();
  const { setShowForm, showForm, auth, setGlobalmsg } = useApp();
  const { refetch } = useQuery("posts", fetchPost);
  const handleSubmit = () => {
    const content = contentRef.current.value;
    const userId = auth.id;
    if (userId && content) {
      create.mutate({ content, userId });
    } else {
      setGlobalmsg({massage:"post can't blank"});
    }
  };
  const create = useMutation((data) => postPost(data), {
    onError: () => {
      setGlobalmsg({massage:"can't create post"});
    },
    onSuccess: (result) => {
      refetch();
      setGlobalmsg({massage:"add new post"});
      setShowForm(false);
    },
  });

  return (
    showForm &&
    auth && (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="w-4/5 lg:w-2/6 mx-auto my-5 sticky top-0 "
      >
        <textarea
          ref={contentRef}
          placeholder="text here to post"
          name="post"
          id="post"
          className="p-4 indent-2 w-full text-slate-700 border rounded-lg"
        ></textarea>

        <button
          type="submit"
          className="px-10 py-1 border-green-500 bg-slate-600 rounded-lg border text-green-500"
        >
          Add
        </button>
      </form>
    )
  );
}

export default AddPost;
