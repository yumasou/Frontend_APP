import React from "react";
import { BsFillMoonStarsFill, BsSun } from "react-icons/bs";
import { useTheme } from "./Utils/ThemeProvider";
import { Outlet } from "react-router-dom";
import Header from "./Components/Header";
import AddPost from "./Components/AddPost";
import AppDrawer from "./Components/AppDrawer";
import SnapBar from "./Components/SnapBar";
function Template() {
  const { mode, setMode } = useTheme();
  return (
    <div className="min-w-full m-0 p-0">
      <Header/>
      <AppDrawer/>
      <AddPost/>
      <Outlet />
      <SnapBar/>
      <button
        onClick={() => setMode((prev) => (prev == "light" ? "dark" : "light"))}
        className="fixed bottom-10 right-10 z-50"
      >
        {mode == "light" ? <BsFillMoonStarsFill /> : <BsSun />}
      </button> 
    </div>
  );
}

export default Template;
