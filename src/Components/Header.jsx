import React from "react";
import { BsFillMoonStarsFill, BsSun } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import { IoMdAddCircle } from "react-icons/io";
import { useApp } from "../ThemedApp";
import { useTheme } from "../Utils/ThemeProvider";
import { useNavigate } from "react-router-dom";
function Header() {
  const { mode, setMode } = useTheme();
  const nevigate = useNavigate();
  const { setShowForm, auth, setDrawer, drawer } = useApp();

  return (
    <div className="w-full py-5 sticky top-0 flex justify-between px-10 border  opacity-90 bg-slate-300 dark:bg-slate-900 dark:border-slate-800">
      <div className="flex gap-2 ">
        <button
          onClick={() => {
            setDrawer(!drawer);
            setShowForm(false);
          }}
        >
          <TiThMenu />
        </button>
        <button
          onClick={() => {
            nevigate("/");
            setShowForm(false);
            setDrawer(false);
          }}
          className="font-bold"
        >
          Social
        </button>
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => {
            setShowForm((prev) => !prev);
            setDrawer(false);
          }}
        >
          <IoMdAddCircle size={24} />
        </button>
        <button
          onClick={() => {
            nevigate("/search");
            setShowForm(false);
            setDrawer(false);
          }}
        >
          <FaSearch size={20}/>
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
        <button
          onClick={() =>
            setMode((prev) => (prev == "light" ? "dark" : "light"))
          }
          className=""
        >
          {mode == "light" ? (
            <BsFillMoonStarsFill size={20} />
          ) : (
            <BsSun size={20} />
          )}
        </button>
      </div>
    </div>
  );
}

export default Header;
