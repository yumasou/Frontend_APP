import React from "react";


import { Outlet } from "react-router-dom";
import Header from "./Components/Header";
import AddPost from "./Components/AddPost";
import AppDrawer from "./Components/AppDrawer";
import SnapBar from "./Components/SnapBar";
function Template() {
  
  return (
    <div className="min-w-full m-0 p-0">
      <Header/>
      <AppDrawer/>
      <AddPost/>
      <Outlet />
      <SnapBar/>
    </div>
  );
}

export default Template;
