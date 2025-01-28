import React, { useRef } from "react";
import { useApp } from "../ThemedApp";
import { queryClient } from "../ThemedApp";
import { removeComment } from "../libs/fetcher";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Item from "../Components/Item";
import Comment from "../Components/Comment";
import { postComment, fetchComments } from "../libs/fetcher";

function CommentList() {
  const commentRef = useRef();
  const { setGlobalmsg, auth } = useApp();
  const { id } = useParams();

  const { refetch, isLoading, isError, error, data } = useQuery(
    ["comments", id],
    () => fetchComments(id),
    
  );
// console.log(data)
  const addComment = () => {
    const postId = id;
    const userId = auth.id;
    const content = commentRef.current.value;
    try {
      if (userId && content) {
        create.mutate({ userId, content, postId });
      } else {
        setGlobalmsg({ massage: "comment can't blank" });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const create = useMutation((datas) => postComment(datas), {
    onError: () => setGlobalmsg({ massage: "comment fail" }),
    onSuccess: (result) => {
      refetch();
      setGlobalmsg({ massage: "add new comment" });
      commentRef.current.value = "";
    },
  });

  const remove = useMutation((ids) => removeComment(ids), {
    onMutate: async (ids) => {
      // Cancel ongoing queries for "comments"
      await queryClient.cancelQueries(["comments", id]);

      // Get the previous comments from the cache
      const previousComments = queryClient.getQueryData(["comments", id]);
      
      if (previousComments) {
        // Optimistically update the cache
        queryClient.setQueryData(["comments", id], (old) => {
          
          return ({ ...old,
            comments: old.comments.filter((m) => m.id !== ids),
            // Filter out the deleted comment
          });
        });
      }
      return { previousComments };
    },
    onError: (error, id, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(["comments", id], context.previousComments);
      }
      setGlobalmsg({ massage: "Failed to delete comment" });
    },
    
    
  });

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }
  return (
    <div className="w-4/5 lg:w-2/6 mx-auto py-10 flex flex-col leading-8 ">
      <Item data={data} />
      {data && (
        <section>
          <div className="mt-10 font-bold">comments</div>
          {data.comments &&
            data.comments.map((m) => (
              <Comment key={m.id} comment={m} remove={remove.mutate} />
            ))}
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
