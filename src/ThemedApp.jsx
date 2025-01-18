import Home from "./Pages/Home";
import { useState } from "react";
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
const AppContext = createContext();
export const queryClient = new QueryClient();
export function useApp() {
  return useContext(AppContext);
}
function ThemedApp() {
  const [showForm, setShowForm] = useState(false);
  const [globalmsg, setGlobalmsg] = useState(false);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Template />,
      children: [
        { path: "/", element: <PostList /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        // { path: "/posts", element: <PostList /> },
        { path: "posts/:id", element: <CommentList /> },
        {path:"profile/:id",element:<Profile/>}
      ],
    },
  ]);
  console.log(showForm)
  return (
    <ThemeProvider>
      <AppContext.Provider
        value={{ showForm, setShowForm, globalmsg, setGlobalmsg }}
      >
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AppContext.Provider>
    </ThemeProvider>
  );
}

export default ThemedApp;
