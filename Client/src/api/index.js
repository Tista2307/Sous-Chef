import axios from 'axios'
const API=axios.create({baseURL:'http://localhost:5000'})
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });
  export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);//we fetch data from MY server 5000
export const fetchSearchedposts = (searchval) => API.get(`/posts/search?searchQuery=${searchval.search||'none'}&tags=${searchval.tags}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likedpost`);
export const postComment = (value,id) => API.post(`/posts/${id}/commentPost`,{value});
export const signUp = (formData) => API.post('/users/signup', formData);
export const signIn = (formData) => API.post('/users/signin', formData);

