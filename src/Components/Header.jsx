import React from "react";
import { TiThMenu } from "react-icons/ti";
import { IoMdAddCircle } from "react-icons/io";
import { useApp } from "../ThemedApp";
import { useNavigate } from "react-router-dom";
function Header() {
  const nevigate = useNavigate();
  const { setShowForm } = useApp();
  return (
    <div className="w-full py-5 sticky top-0 flex justify-between px-10 border mb-10 opacity-90 bg-slate-300 dark:bg-slate-900 dark:border-slate-800">
      <div className="flex gap-2 ">
        <button onClick={() => nevigate("/")}>
          <TiThMenu />
        </button>
        <button onClick={() => nevigate("/")} className="font-bold">
          APP
        </button>
      </div>
      <div>
        <button onClick={() => setShowForm((prev) => !prev)}>
          <IoMdAddCircle />
        </button>
      </div>
    </div>
  );
}

export default Header;
