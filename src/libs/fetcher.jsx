import axios from "axios";

const api = import.meta.env.VITE_API;

export const postLogin = async ({username, password}) => {
  const res = axios.post(`${api}/login`, { username, password });
  return res;
};

export const postUser = async ({name, username, email, password, bio}) => {
     const res=axios.post(`${api}/users`,{name,username,email,password,bio})
     return res
};
