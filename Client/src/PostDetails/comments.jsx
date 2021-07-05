import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core/';
import { useDispatch } from 'react-redux';
import {postComment} from  '../actions/posts';
//import { commentPost } from '../actions/posts';
import useStyles from './styles';

const Comments = ({ post }) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState(post?.comments);
    const classes = useStyles(); 
    const dispatch=useDispatch();
  console.log(post)
  const submitComment = async () => {
      const finalcomment=`${user?.result.name}:${comment}`
   const newc= await dispatch(postComment(finalcomment,post._id))
   setComments(newc);
   setComment('');
  };
  return(
    <div>
        <div className={classes.commentsOuterContainer}>
            <div className={classes.commentsInnerContainer}>
            <Typography style={{fontFamily:'serif',fontWeight:'bold'}} gutterBottom variant="h6">Comments</Typography>
            {comments?.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
               <strong>{c.split(':')[0]}</strong>
              &nbsp;{c.split(':')[1]}
              </Typography>))}
            </div>
           { (user?.result?.name)&&(
            <div style={{ width: '70%' }}>
          <Typography style={{fontFamily:'serif',fontWeight:'bold'}}gutterBottom variant="h6">Write a comment</Typography>
          <TextField fullWidth rows={4} variant="outlined" label="Comment" multiline value={comment} onChange={(e) => setComment(e.target.value)} />
          <br />
          <Button style={{ marginTop: '10px',backgroundColor:'black',color:'white'}} fullWidth disabled={!comment.length} color="primary" variant="contained" onClick={submitComment}>
            Post this Comment!
          </Button>
        </div>)}
        </div>
    </div>
        )
};

export default Comments;