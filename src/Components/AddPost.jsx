import React, { useRef } from "react";
import { useApp } from "../ThemedApp";
function AddPost(props) {
  
  const { showForm } = useApp();
  return (
    showForm && (
      <form
        className="w-4/5 sm:w-2/6 mx-auto"
      >
        <textarea placeholder="text here to post" name="post" id="post" className="p-4 indent-2 w-full border rounded-lg">
          
        </textarea>
        
        <a
          href="#"
          style={{
            textDecoration: "none",
            border: "1px solid lightgreen",
            padding: "5px 10px",
            borderRadius: "5px",
          }}
        >
          Add
        </a>
      </form>
    )
  );
}

export default AddPost;
