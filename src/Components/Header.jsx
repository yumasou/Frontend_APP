import React from "react";
import { TiThMenu } from "react-icons/ti";
import { IoMdAddCircle } from "react-icons/io";
import { useApp } from "../ThemedApp";
import { useNavigate } from "react-router-dom";
function Header() {
  const nevigate = useNavigate();
  const { setShowForm, auth, setDrawer, drawer } = useApp();

  return (
    <div className="w-full py-5 sticky top-0 flex justify-between px-10 border  opacity-90 bg-slate-300 dark:bg-slate-900 dark:border-slate-800">
      <div className="flex gap-2 ">
        <button onClick={() => setDrawer(!drawer)}>
          <TiThMenu />
        </button>
        <button
          onClick={() => {
            nevigate("/");
            setDrawer(false);
          }}
          className="font-bold"
        >
          Home
        </button>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => {
            setShowForm((prev) => !prev);
            setDrawer(false);
          }}
        >
          <IoMdAddCircle />
        </button>
        {!auth && (
          <div className="space-x-2">
            <button
              onClick={() => {
                nevigate("/login");
                setDrawer(false);
              }}
            >
              {" "}
              login{" "}
            </button>
            <button
              onClick={() => {
                nevigate("/register");
                setDrawer(false);
              }}
            >
              register
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
