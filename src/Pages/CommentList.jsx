import React, { useState } from "react";
import { queryClient } from "../ThemedApp";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Item from '../Components/Item'
import Comment from "../Components/Comment";
function CommentList() {
  const { id } = useParams();
  const [comment, setComment] = useState();
  const api = import.meta.env.VITE_API;

  const fetchComments = async () => {
    const res = await axios.get(`${api}/content/posts/${id}`);
    return res.data.data;
  };

  const { isLoading, isError, error, data } = useQuery(
    "comments",
    fetchComments
  );

//   const addNewComment=async()=>{
//    await axios.post(`${api}/`)
//   }
  console.log(data)

  const addComment=()=>{}



  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }
  return (
    <div className="w-4/5 sm:w-2/6 mx-auto py-10 flex flex-col leading-8 ">
      <Item data={data}/>
      <section>
        <div className="mt-10 font-bold">comments</div>
        {data.comments && data.comments.map((m) => <Comment key={m.id}  comment={m}/>)}
      </section>

      <form action={() => addComment} className="mt-5 font-bold space-y-2">
        <h3>add comment</h3>
        <input
          type="text"
          onChange={(event)=>setComment(event.target.value)}
          className="border w-full rounded-lg indent-3"
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
