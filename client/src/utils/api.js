let token = localStorage.token;
if (!token) {
  localStorage.token = Math.random().toString(36).substr(-8);
  token = localStorage.token;
}

const headers = {
  Accept: 'application/json',
  Authorization: token,
};

export const getAllCategories = () =>
  fetch('/categories', { headers })
    .then(res => res.json())
    .then(data => data.categories);

export const getPostsByCategory = category =>
  fetch(`/${category}/posts`, { headers })
    .then(res => res.json())
    .then(data => data);

export const getAllPosts = () =>
  fetch('/posts', { headers })
    .then(res => res.json())
    .then(data => data);

export const addNewPost = newPost =>
  fetch('/posts', {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...newPost }),
  }).then(res => res.json())
    .then(data => data);

export const getPostById = postId =>
  fetch(`/posts/${postId}`, { headers })
    .then(res => res.json())
    .then(data => data);

export const deletePostById = postId =>
  fetch(`/posts/${postId}`, {
    method: 'DELETE',
    headers,
  })
    .then(res => res);

export const votePost = (postId, option) =>
  fetch(`/posts/${postId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ option }),
  }).then(res => res.json())
    .then(data => data);

export const updatePost = post =>
  fetch(`/posts/${post.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...post }),
  }).then(res => res.json())
    .then(data => data);

export const getCommentsByPost = postId =>
  fetch(`/posts/${postId}/comments`, { headers })
    .then(res => res.json())
    .then(data => data);

export const getCommentById = commentId =>
  fetch(`/comments/${commentId}`, { headers })
    .then(res => res.json())
    .then(data => data);

export const updateComment = comment =>
  fetch(`/comments/${comment.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...comment }),
  }).then(res => res.json())
    .then(data => data);

export const addNewComment = newComment =>
  fetch('/comments', {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...newComment }),
  }).then(res => res.json())
    .then(data => data);

export const voteComment = (commentId, option) =>
  fetch(`/comments/${commentId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ option }),
  }).then(res => res.json())
    .then(data => data);

export const deleteCommentById = commentId =>
  fetch(`/comments/${commentId}`, {
    method: 'DELETE',
    headers,
  }).then(res => res.json())
    .then(data => data);
