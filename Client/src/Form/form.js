import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import FileBase from 'react-file-base64';
import { useSelector } from 'react-redux';
import useStyles from './styles';
import { createPost,updatePost } from '../actions/posts';
import { useHistory } from 'react-router';


const Form = ({currID,setcurrID}) => {

  const [postData, setPostData] = useState({ title: '', recipe: '', tags: '', postfile: '' });
  const dispatch = useDispatch();
  const post= useSelector((state)=>currID?state.posts.posts.find((p)=>p._id===currID):null);
  const classes = useStyles();
  const history= useHistory()
  const user=JSON.parse(localStorage.getItem('profile'))
  const clear = () => {
    setcurrID(0);
    setPostData({ title: '', recipe: '', tags: '', postfile: '' });
  };
  useEffect(()=>{
  if(post) setPostData(post);
  },[post])

  const handleSubmit = (e) => {
    e.preventDefault();
      if(currID){dispatch(updatePost(currID,{...postData,name:user?.result?.name})); clear();}
      else{dispatch(createPost({...postData,name:user?.result?.name}));
      history.push('/');
      clear();}
     
    }
  
    if (!user?.result?.name) {
      return (
        <Paper className={classes.paper}>
          <Typography style={{fontFamily:'serif'}}variant="h6" align="center">
            Please Sign-In to post your own recipes and like and comment on other's recipes.
          </Typography>
        </Paper>
      );
    }
  return (
    <Paper className={classes.paper}elevation={6}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography style={{fontFamily:'serif',fontWeight:'bold'}} variant="h6">{currID?'Edit your':'Post a'} Recipe!</Typography>
    
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name="recipe" variant="outlined" label="Recipe" fullWidth multiline rows={4} value={postData.recipe} onChange={(e) => setPostData({ ...postData, recipe: e.target.value })} />
        <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, postfile: base64 })} /></div>
        <Button style={{background:'black',color:'white'}} className={classes.buttonSubmit} variant="contained"  size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" style={{background:'black',color:'white'}} size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;