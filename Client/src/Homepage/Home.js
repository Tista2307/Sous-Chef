import React,{useState,useEffect} from 'react';
import { Container, Grow, Grid,Paper,AppBar,TextField,Button } from '@material-ui/core';
import  Pagination  from '../Pagination.jsx';
import Posts from '../Posts/Posts.js'
import Form from '../Form/form.js'
import ChipInput from 'material-ui-chip-input'
import useStyles from './styles.js';
import { useDispatch } from 'react-redux';//lets us use dispatch
import { getPosts,getSearchedposts } from '../actions/posts.js';//loads the data for fetchall
import {useHistory,useLocation} from 'react-router-dom'
 
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Home=()=>{
    const classes = useStyles();
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1;
    const searchquery = query.get('searchQuery');
    const [currID,setcurrID]=useState(null);
    const [search,setsearch]=useState('')
    const [searchbytags,setsearchbytags]=useState([])
    const dispatch = useDispatch();
    

    const searchposts =()=>{
    if(search.trim()||searchbytags){
      dispatch(getSearchedposts({search:search.trim(),tags:searchbytags.join(',')}))
     history.push(`/posts/search?searchQuery=${search||'none'}&tags=${searchbytags}`)
    }
    else{
      history.push('/')
    }
    }


    return(
        <Grow in>
          <Container maxWidth="xl">
            <Grid container justify="space-between" className={classes.gridContainer} alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={6} md={9}>
            <Posts setcurrID={setcurrID}/>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField 
              name="search" 
              variant="outlined" 
              label="Search Recipes" 
              fullWidth 
              value={search}
              onChange={(e)=>setsearch(e.target.value)}
              />
              <ChipInput 
              style={{margin: '10px 0'}}
              value={searchbytags}
              onAdd={(tag)=>setsearchbytags([...searchbytags,tag])}
              onDelete={(deltag)=>setsearchbytags(searchbytags.filter((tag)=>tag!==deltag))}
              label="Search tags"
              variant="outlined"
              />
              <Button style={{background:"black",color:"white"}} onClick={searchposts}color="primary"className={classes.addButton}>Search</Button>
             </AppBar>
            <Form  currID={currID} setcurrID={setcurrID}/> 
            {(!searchquery&&!searchbytags.length)&&(
               <Paper elevation={6} className={classes.pagination}>
               <Pagination page={page}/>
             </Paper>
            )}
           
            </Grid>
           
            </Grid>
          </Container>
        </Grow>
        
        )
}
export default Home;