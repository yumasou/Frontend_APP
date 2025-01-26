import React from "react";
import { useApp } from "../ThemedApp";
import { useNavigate } from "react-router-dom";
function AppDrawer() {
  const navigate = useNavigate();
  const { setDrawer, drawer, auth, setAuth } = useApp();
  const logout = () => {
    setAuth(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <div className="relative">
      <div
        className={` ${
          drawer ? "visible" : "invisible"
        } fixed  left-0 z-40 rounded-lg w-52 bg-inherit transform border dark:border-slate-700 shadow-lg transition-transform duration-300 `}
      >
        <div className="p-4 bg-blue-600 indent-3 text-white text-lg font-semibold">
          {`Welcome ${auth ? auth.username : "Guest"}`}
        </div>
        <ul className="space-y-2 p-4">
          {auth && (
            <li>
              <button
                onClick={() => {
                  navigate(`/profile/${auth.id}`);
                  setDrawer(false);
                }}
                className="block px-4 py-2 rounded hover:bg-blue-100 text-blue-600"
              >
                Profile
              </button>
            </li>
          )}
          {auth && (
            <li>
              <button
                onClick={() => {
                  logout();
                  setDrawer(false);
                }}
                className="block px-4 py-2 rounded hover:bg-blue-100 text-blue-600"
              >
                Logout
              </button>
            </li>
          )}
          <li>
            <button className="block px-4 py-2 rounded hover:bg-blue-100 text-blue-600">
              Settings
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AppDrawer;
