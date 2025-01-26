import React from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../ThemedApp";
import { useMutation } from "react-query";
import { postUser } from "../libs/fetcher";
function Register() {
  const { setGlobalmsg } = useApp();
  const nameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const bioRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = () => {
    const name = nameRef.current.value;
    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const bio = bioRef.current.value;
    const password = passwordRef.current.value;
    if (!name || !username || !email || !password) {
      setGlobalmsg({massage:"username or password missing"});
    } else {
      create.mutate({ name, username, email, bio, password });
    }
  };
  const create = useMutation((data) => postUser(data), {
    onError: () => {
      setGlobalmsg({massage:"can't create user"});
    },
    onSuccess: (result) => {
      setGlobalmsg({massage:"user created"});
      navigate("/login");
    },
  });
  return (
    <div className="w-4/5 sm:w-2/6 mx-auto">
      <div className="py-12">
        <h3 className="text-center font-bold my-16 text-5xl">Register</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="flex flex-col space-y-10 "
        >
          <input
            ref={nameRef}
            type="text"
            placeholder="name"
            className="w-full border rounded-lg leading-9  text-slate-700 px-5"
          />
          <input
            ref={usernameRef}
            type="text"
            placeholder="username"
            className="w-full border rounded-lg leading-9  text-slate-700 px-5"
          />
          <input
            ref={emailRef}
            type="email"
            placeholder="email"
            className="w-full border rounded-lg leading-9  text-slate-700 px-5"
          />
          <input
            ref={bioRef}
            type="text"
            placeholder="bio(optional)"
            className="w-full border rounded-lg leading-9  text-slate-700 px-5"
          />
          <input
            ref={passwordRef}
            type="password"
            placeholder="password"
            className="w-full border rounded-lg leading-9  text-slate-700 px-5"
          />
          <button
            type="submit"
            className="w-full rounded-lg leading-9 bg-green-500"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
