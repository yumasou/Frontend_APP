import axios from "axios";

const api = import.meta.env.VITE_API;

export const postLogin = async ({ username, password }) => {
  const res = axios.post(`${api}/login`, { username, password });
  return res;
};

export const postUser = async ({ name, username, email, password, bio }) => {
  const res = axios.post(`${api}/users`, {
    name,
    username,
    email,
    password,
    bio,
  });
  return res;
};

export const postPost = async ({ content, userId }) => {
  const res = axios.post(`${api}/content/posts`, { content, userId });
  return res;
};

export const postComment = async ({ content, userId, postId }) => {
  const res = axios.post(`${api}/content/comments`, {
    content,
    userId,
    postId,
  });
  return res;
};

export const fetchPost = async () => {
  const result = await axios.get(`${api}/content/posts`);
  return result.data.data;
};