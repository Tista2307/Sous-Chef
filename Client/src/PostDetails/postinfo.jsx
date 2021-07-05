import React,{useEffect} from 'react'
import {Paper,Typography,CircularProgress,Divider} from '@material-ui/core'
import { useDispatch,useSelector } from 'react-redux'
import moment from 'moment'
import { useParams,useHistory } from 'react-router'
import useStyles from './styles.js'
import { getPost,getSearchedposts } from '../actions/posts'
import Comments from './comments.jsx'
const PostDetails = () => {
    const {post,posts,isLoading}=useSelector((state)=>state.posts)
    const dispatch = useDispatch();
    const history=useHistory();
    const classes=useStyles();
    const {id}=useParams();
    const openPost = (_id) => history.push(`/posts/${_id}`);
    useEffect(()=>{
    dispatch(getPost(id))
    },[id])
    useEffect(()=>{
        if(post)
        dispatch(getSearchedposts({search:'none',tags:post?.tags.join(',')}))
        },[post])
    
    if(!post)return null;
    if(isLoading){
        return (
            <Paper elevation={6} className={classes.loadingPaper}>
             <CircularProgress/>
            </Paper>
        )
    }
    const rP = posts.filter(({ _id }) => _id !== post._id);
    let recommendedPosts=[];
    let c=0;
   if(rP.length<=5){c=rP.length}
   else{c=5}
    for(let i=0;i<c;i++){
      recommendedPosts[i]=rP[i]
    }
    
    return (
        <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
        <div className={classes.card}>
          <div className={classes.section}>
            <Typography style={{fontFamily:'serif',fontWeight:'bold'}} variant="h3" component="h2">{post.title}</Typography>
            <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
            <Typography gutterBottom variant="body1" component="p">{post.recipe}</Typography>
            <Typography style={{fontFamily:'serif',fontWeight:'bold'}} variant="h6">Created by: {post.name}</Typography>
            <Typography variant="body1">{moment(post.postdate).fromNow()}</Typography>
            
            <Divider style={{ margin: '20px 0' }} />
            <Comments post={post}/>
          </div>
          <div className={classes.imageSection}>
            <img className={classes.media} style={{height:"30rem",width:"40rem"}} src={post.postfile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
          </div>
        </div>
        {!!recommendedPosts.length && (
        <div className={classes.section}>
          <Typography style={{fontFamily:'serif',fontWeight:'bold'}} gutterBottom variant="h5">You might also like:</Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(({ title, name, recipe, likes, postfile, _id }) => (
              <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                <Typography style={{fontFamily:'serif',fontWeight:'bold'}} gutterBottom variant="h6">{title}</Typography>
                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                <Typography gutterBottom variant="subtitle2">{recipe.length>150?recipe.substring(0,150)+"...":recipe}</Typography>
                <Typography style={{fontFamily:'serif',fontWeight:'bold'}}gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                <img src={postfile} width="200px" />
              </div>
            ))}
          </div>
        </div>
      )}
        </Paper>
    )
}

export default PostDetails
