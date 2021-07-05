import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography,ButtonBase } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import useStyles from './styles';
import {useDispatch} from 'react-redux';
import {deletePost,likePost} from '../../actions/posts.js'
import { useHistory } from 'react-router';
const Post=({post,setcurrID})=>{
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const history1 = useHistory();
    const user = JSON.parse(localStorage.getItem('profile'));

    const Likes = () => {
      if (post.likes.length > 0) {
        return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
          ? (
            <><ThumbUpAltIcon style={{color:"black"}} fontSize="small" />&nbsp; <div style={{color:"black"}}>{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</div></>
          ) : (
            <><ThumbUpAltOutlined style={{color:"black"}} fontSize="small" />&nbsp;<div style={{color:"black"}}>{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</div></>
          );
      }
  
      return <><ThumbUpAltOutlined style={{color:"black"}} fontSize="small" />&nbsp;<div style={{color:"black"}}>Like</div></>;
    };
    const removePost =(id)=>{
      dispatch(deletePost(id))
      history1.push('/');
    }
   
    const openPost=()=>history.push(`/posts/${post._id}`)
    return (
        <Card className={classes.card} raised elevation={6}>
          
        <CardMedia className={classes.media} image={post.postfile} title={post.title} />
        <div className={classes.overlay}>
        <Typography  variant="h6">{post.name}</Typography>
        <Typography variant="body2">{moment(post.postdate).fromNow()}</Typography>
        <Button color="inherit" onClick={openPost} style={{ color: 'white',marginLeft:'190px',fontSize:"0.7rem",marginTop:'50px'}} >See More</Button>
        </div>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
      <div className={classes.overlay2}>
        <Button onClick={() => setcurrID(post._id)} style={{ color: 'white' }} size="small">
          <MoreHorizIcon fontSize="default" />
        </Button>
      </div>
      )}
      
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <Typography  style={{fontFamily:'serif',fontWeight:'bold'}} className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{post.recipe.length>150?post.recipe.substring(0,151)+"...":post.recipe}</Typography>
      </CardContent>
      
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}><Likes /></Button>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
        <Button size="small" color="secondary" onClick={() => removePost(post._id)}>
          <DeleteIcon style={{color:"black"}} fontSize="small" /> 
        </Button>
        )}
      </CardActions>
  
        </Card>
        
    )
}
export default Post;