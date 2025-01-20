import React from "react";
import { useRef } from "react";
import { postLogin } from "../libs/fetcher";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useApp } from "../ThemedApp";

function Login() {
  const { setAuth, setGlobalmsg } = useApp();
  const userRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = () => {
    const username = userRef.current.value || null;
    const password = passwordRef.current.value || null;
    create.mutate({ username, password });
  };
  const create = useMutation(async (data) => postLogin(data), {
    onError: async () => setGlobalmsg("Error, can't login"),
    onSuccess: async (result) => {
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("user", JSON.stringify(result.data.user));
      setAuth(result.data.user);
      navigate("/");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="w-4/5 sm:w-2/6 mx-auto"
    >
      <div className="py-12">
        <h3 className="text-center text-5xl font-bold my-16">Login</h3>
        <div className="flex flex-col space-y-10 ">
          <input
            type="text"
            placeholder="username"
            ref={userRef}
            className="w-full border rounded-lg leading-9  text-slate-700 px-5"
          />
          <input
            type="password"
            placeholder="password"
            ref={passwordRef}
            className="w-full border rounded-lg leading-9  text-slate-700 px-5"
          />
          <button
            type="submit"
            className="w-full rounded-lg leading-9 bg-green-500"
          >
            Login
          </button>
        </div>
      </div>
    </form>
  );
}

export default Login;
