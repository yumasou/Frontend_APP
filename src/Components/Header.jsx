import React,{useEffect} from "react";
import { BsFillMoonStarsFill, BsSun } from "react-icons/bs";
import { queryClient } from "../ThemedApp";
import { IoMdNotifications } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import { IoMdAddCircle } from "react-icons/io";
import { useApp } from "../ThemedApp";
import { useTheme } from "../Utils/ThemeProvider";
import { useNavigate } from "react-router-dom";
import { fetchNoti } from "../libs/fetcher";
import { useQuery } from "react-query";
import { useSocket } from "../Utils/SocketProvider";
function Header() {
  const { mode, setMode } = useTheme();
  const nevigate = useNavigate();
  const { setShowForm, auth, setDrawer, drawer } = useApp();
  const { isLoading, isError, data } = useQuery(["Notis", auth], fetchNoti);
  const {notification}=useSocket()
  useEffect(()=>{
   
      queryClient.invalidateQueries(["Notis",auth])
          queryClient.invalidateQueries("Notis")
     },[notification])
  const notiCount = () => {
    if (!auth) return 0;
    if (isLoading || isError) return 0;
    return data.filter((m) => m.read === false).length;
  };
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
          <FaSearch size={20} />
        </button>
        <button
          className="relative"
          disabled={!auth}
          onClick={() => {
            nevigate("/notifications");
            setDrawer(false);
            setShowForm(false);
          }}
        >
          <span className="bg-red-600 leading-5 text-sm  border  border-red-800 w-5 h-5 font-bold text-white rounded-full absolute top-0 right-0 translate-x-1 -translate-y-4">
            <>{notiCount()}</>
          </span>
          <IoMdNotifications size={24} />
        </button>
        {!auth && (
          <div className="space-x-2 flex flex-col lg:flex-row font-bold">
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
