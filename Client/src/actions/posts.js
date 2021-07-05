import * as api from '../api';//exporting api

export const getPost=(id)=>async(dispatch)=>{
   try{
   dispatch({type:'START_LOADING'})
   const { data}=await api.fetchPost(id);//makes a call to api/index.js/fetchposts func meaning axios.get(URL)// this data is stored in destructed data
   dispatch({type:'FETCH_POST',payload:data})//if dispatch is of type fetchall,its sending all data
   dispatch({type:'END_LOADING'})
   }
   catch(err){
   console.log(err.message);
   }
   }
export const getPosts=(page)=>async(dispatch)=>{
try{
dispatch({type:'START_LOADING'})
const { data}=await api.fetchPosts(page);//makes a call to api/index.js/fetchposts func meaning axios.get(URL)// this data is stored in destructed data
dispatch({type:'FETCH_ALL',payload:data})//if dispatch is of type fetchall,its sending all data
dispatch({type:'END_LOADING'})
}
catch(err){
console.log(err.message);
}
}
export const getSearchedposts=(searchval)=>async(dispatch)=>{
   try{
      dispatch({type:'START_LOADING'})
   const {data:{data}}=await api.fetchSearchedposts(searchval);//makes a call to api/index.js/fetchposts func meaning axios.get(URL)// this data is stored in destructed data
   dispatch({type:'FETCH_SEARCH',payload:data})//if dispatch is of type fetchall,its sending all data
   dispatch({type:'END_LOADING'})   
}
   catch(err){
   console.log(err.message);
   }
   }
export const createPost=(post)=>async(dispatch)=>{
    try{
   dispatch({type:'START_LOADING'})
    const {data}=await api.createPost(post);//makes a call to api/index.js/fetchposts func meaning axios.get(URL)// this data is stored in destructed data
    
    dispatch({type:'CREATE',payload:data})//if dispatch is of type fetchall,its sending all data
    dispatch({type:'END_LOADING'})
   }
    catch(err){
    console.log(err.message);
    }
 }
 export const updatePost=(id,post)=>async(dispatch)=>{
    try{
    const {data}=await api.updatePost(id,post);//makes a call to api/index.js/fetchposts func meaning axios.get(URL)// this data is stored in destructed data
    dispatch({type:'UPDATE',payload:data})//if dispatch is of type fetchall,its sending all data
    }
    catch(err){
    console.log(err.message);
    }
 }
 export const deletePost=(id)=>async(dispatch)=>{
   try{
   await api.deletePost(id);//makes a call to api/index.js/fetchposts func meaning axios.get(URL)// this data is stored in destructed data
   dispatch({type:'DELETE',payload:id})//if dispatch is of type fetchall,its sending all data
   }
   catch(err){
   console.log(err.message);
   }
}
export const likePost=(id)=>async(dispatch)=>{
   try{
   const {data}=await api.likePost(id);//makes a call to api/index.js/fetchposts func meaning axios.get(URL)// this data is stored in destructed data
   dispatch({type:'UPDATE',payload:data})//if dispatch is of type fetchall,its sending all data
   }
   catch(err){
   console.log(err.message);
   }
}
export const postComment=(value,id)=>async(dispatch)=>{
 try{
   const {data}= await api.postComment(value,id)
   dispatch({type:'COMMENT',payload:{data}})
   console.log(data);
   return data.comments;
   
 }
 catch(err){
  console.log(err.message)
 }
}
