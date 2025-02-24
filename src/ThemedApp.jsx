import { useEffect, useState } from "react";
import ThemeProvider from "./Utils/ThemeProvider.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Template from "./Template.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import Profile from "./Pages/Profile.jsx";
import { createContext, useContext } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import PostList from "./Pages/PostList.jsx";
import CommentList from "./Pages/CommentList.jsx";
import Like from "./Pages/Like.jsx";
import Followers from "./Pages/Followers.jsx";
import Followings from "./Pages/Followings.jsx";
import Search from "./Pages/Search.jsx";
import Noti from "./Pages/Noti.jsx";
import SocketProvider from "./Utils/SocketProvider.jsx";
import Chat from "./Pages/Chat.jsx";
import Conversation from "./Components/Conversation.jsx"
const AppContext = createContext();
export const queryClient = new QueryClient();
export function useApp() {
  return useContext(AppContext);
}
function ThemedApp() {
  const [showForm, setShowForm] = useState(false);
  const [globalmsg, setGlobalmsg] = useState({ massage: null });
  const [drawer, setDrawer] = useState(false);
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("user")));

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Template />,
      children: [
        { path: "/", element: <PostList /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/posts/:id", element: <CommentList /> },
        { path: "/profile/:id", element: <Profile /> },
        { path: "/likes/:type/:id", element: <Like /> },
        { path: "/followers/user/:id", element: <Followers /> },
        { path: "/followings/user/:id", element: <Followings /> },
        { path: "/search", element: <Search /> },
        { path: "/notifications", element: <Noti /> },
        {
          path: "/chat",
          element: <Chat />,
          children: [{ path: "/chat/:id", element: <Conversation /> }],
        },
      ],
    },
  ]);

  return (
    <ThemeProvider>
      <AppContext.Provider
        value={{
          showForm,
          setShowForm,
          setDrawer,
          drawer,
          globalmsg,
          setGlobalmsg,
          auth,
          setAuth,
        }}
      >
        <QueryClientProvider client={queryClient}>
          <SocketProvider>
            <RouterProvider router={router} />
          </SocketProvider>
        </QueryClientProvider>
      </AppContext.Provider>
    </ThemeProvider>
  );
}

export default ThemedApp;
