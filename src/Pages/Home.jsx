import { useEffect, useState } from "react";
import { useTheme } from "../Utils/ThemeProvider";
import AddPost from "../Components/AddPost";
import PostList from "../Components/PostItem";
import { useApp } from "../ThemedApp";
function Home() {
  const api=import.meta.env.VITE_API
  
  return (
    <div className="w-4/5 sm:w-2/6 mx-auto">
      hello 
    </div>
  );
}
export default Home;
