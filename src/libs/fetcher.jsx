import axios from "axios";

export const getToken = () => {
  return localStorage.getItem("token");
};
export const api = import.meta.env.VITE_API;

/***
 * Post
 */

export const postLogin = async ({ username, password }) => {
  const res = await axios.post(`${api}/login`, { username, password });
  return res;
};

export const postUser = async ({ name, username, email, password, bio }) => {
  const res = await axios.post(`${api}/users`, {
    name,
    username,
    email,
    password,
    bio,
  });
  return res;
};

export const postPostLike = async ({ id }) => {
  const token = getToken();
  if (!token) {
    throw new Error("User is not authenticated");
  }
  try {
    const result = await axios.post(
      `${api}/content/like/posts/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return result;
  } catch (e) {
    console.log(e);
  }
};

export const postCommentLike = async ({ id }) => {
  const token = getToken();
  if (!token) {
    throw new Error("User is not authenticated");
  }
  try {
    const result = await axios.post(
      `${api}/content/like/comments/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return result;
  } catch (e) {
    console.log(e);
  }
};
export const postPost = async ({ content, userId }) => {
  const token = getToken();
  if (!token) {
    throw new Error("User is not authenticated");
  }
  const res = await axios.post(
    `${api}/content/posts`,
    { content, userId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res;
};

export const postComment = async ({ content, userId, postId }) => {
  const token = getToken();
  if (!token) {
    throw new Error("User is not authenticated");
  }
  const res = await axios.post(
    `${api}/content/comments`,
    {
      content,
      userId,
      postId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res;
};

export const postFollow = async ({ id }) => {
  const token = getToken();
  if (!token) {
    throw new Error("User is not authenticated");
  }
  try {
    const result = await axios.post(
      `${api}/follow/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return result;
  } catch (e) {
    console.log(e);
  }
};

export const createChat = async (userIds) => {
  const token = getToken();
  console.log(userIds);
  try {
    if (!token) return false;
    const res = await axios.post(
      `${api}/chat/create`,
      { userIds },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const sendMassage = async ({ chatId, content }) => {
  const token = getToken();
  try {
    if (!token) return false;
    const res = await axios.post(
      `${api}/${chatId}/massage`,
      { content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
/***
 * Get
 */
export const fetchPost = async () => {
  const result = await axios.get(`${api}/content/posts`);
  return result.data.data;
};

export const fetchComments = async (id) => {
  const result = await axios.get(`${api}/content/posts/${id}`);
  return result.data.data;
};

export const fetchUser = async (id) => {
  const res = await axios.get(`${api}/users/${id}`);
  return res.data;
};

export const fetchPostLikes = async (id) => {
  const res = await axios.get(`${api}/content/likes/posts/${id}`);
  return res.data;
};

export const fetchCommentLikes = async (id) => {
  const res = await axios.get(`${api}/content/likes/comments/${id}`);
  return res.data;
};

export const fetchFollowers = async (id) => {
  const res = await axios.get(`${api}/followers/${id}`);
  return res.data;
};
export const fetchFollowings = async (id) => {
  const res = await axios.get(`${api}/followings/${id}`);
  return res.data;
};

export const searchUsers = async (search) => {
  const res = await axios.get(`${api}/search?q=${search}`);
  return res.data;
};

export const fetchFollowingPosts = async () => {
  const token = getToken();
  const res = await axios.get(`${api}/content/followingposts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // console.log(res.data);
  return res.data;
};

export const fetchNoti = async () => {
  const token = getToken();
  try {
    if (!token) return false;
    const res = await axios.get(`${api}/content/noti`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const fetchChats = async () => {
  const token = getToken();
  try {
    if (!token) return false;
    const res = await axios.get(`${api}/chats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const fetchMassages = async ({ chatId, limit, skip }) => {
  const token = getToken();
  try {
    if (!token) return false;
    const res = await axios.get(
      `${api}/${chatId}/massages?limit=${limit}&skip=${skip}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(res)
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
/**
 * Put
 */
export const makeNotiRead = async (id) => {
  const token = getToken();
  const res = await axios.put(
    `${api}/content/noti/read/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const makeAllNotiRead = async () => {
  const token = getToken();
  const res = await axios.put(
    `${api}/content/noti/read`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const makeMessagesRead = async ({ chatId, readId }) => {
  const token = getToken();
  try {

    const res =await axios.put(
      `${api}/chat/${chatId}`,
      { readId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

/***
 * Delete
 */

export const deletePost = async (id) => {
  const token = getToken();
  if (!token) {
    throw new Error("User is not authenticated");
  }
  try {
    const result = await axios.delete(`${api}/content/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result;
  } catch (e) {
    console.log(e);
  }
};

export const removeComment = async (id) => {
  const token = getToken();
  if (!token) {
    throw new Error("User is not authenticated");
  }
  try {
    const result = await axios.delete(`${api}/content/comments/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result;
  } catch (error) {
    console.error("Error Response:", error.response); // Log error details
    throw error; // Ensure React Query receives the error
  }
};

export const unlikePost = async ({ id }) => {
  const token = getToken();
  if (!token) {
    throw new Error("User is not authenticated");
  }
  try {
    const result = await axios.delete(`${api}/content/unlike/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result;
  } catch (e) {
    console.log(e);
  }
};

export const unlikeComment = async ({ id }) => {
  const token = getToken();
  if (!token) {
    throw new Error("User is not authenticated");
  }
  try {
    const result = await axios.delete(`${api}/content/unlike/comments/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result;
  } catch (e) {
    console.log(e);
  }
};

export const unFollow = async ({ id }) => {
  const token = getToken();
  if (!token) {
    throw new Error("User is not authenticated");
  }
  try {
    const result = await axios.delete(`${api}/unfollow/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result;
  } catch (e) {
    console.log(e);
  }
};
