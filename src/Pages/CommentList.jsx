import React, { useRef } from "react";
import { useApp } from "../ThemedApp";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Item from "../Components/Item";
import Comment from "../Components/Comment";
import { postComment } from "../libs/fetcher";

function CommentList() {
  const commentRef = useRef();
  const { setGlobalmsg, auth } = useApp();
  const { id } = useParams();
  const api = import.meta.env.VITE_API;

  const fetchComments = async () => {
    const res = await axios.get(`${api}/content/posts/${id}`);
    return res.data.data;
  };
  const { refetch } = useQuery("comments", fetchComments);
  const { isLoading, isError, error, data } = useQuery(
    "comments",
    fetchComments
  );

  const addComment = () => {
    const postId = id;
    const userId = auth.id;
    const content = commentRef.current.value;
    try{
      if (userId && content) {
        create.mutate({ userId, content, postId });
      } else {
        setGlobalmsg("comment can't blank");
      }
    }catch(e){
      console.log(e)
    }
  };

  const create = useMutation((data) => postComment(data), {
    onError: () => setGlobalmsg("comment fail"),
    onSuccess: (result) => {
      refetch();
      setGlobalmsg("add new comment");
      commentRef.current.value=""
    },
  });

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }
  return (
    <div className="w-4/5 sm:w-2/6 mx-auto py-10 flex flex-col leading-8 ">
      <Item data={data} />
      {data && (
        <section>
          <div className="mt-10 font-bold">comments</div>
          {data.comments &&
            data.comments.map((m) => <Comment key={m.id} comment={m} />)}
        </section>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          addComment();
        }}
        className="mt-5 font-bold space-y-2"
      >
        <h3>add comment</h3>
        <input
          type="text"
          ref={commentRef}
          className="border w-full rounded-lg indent-3 text-slate-700"
          placeholder="add new comment"
        />
        <button
          type="submit"
          className="border px-2 rounded-lg bg-green-300 float-right"
        >
          submit
        </button>
      </form>
    </div>
  );
}

export default CommentList;
