import {  AppBar, Typography,Toolbar,Avatar,Button } from '@material-ui/core';
import useStyles from './styles.js';
import cooking from '../images/cooking.png';
import {Link,useLocation} from 'react-router-dom';
import {useState,useEffect} from 'react';
import {useDispatch} from 'react-redux';
import { useHistory } from 'react-router';
import decode from 'jwt-decode';

const Navbar=()=>{
    const classes = useStyles();
    const dispatch=useDispatch();
    const history=useHistory();
    const location=useLocation();
    const [user,setUser]=useState(JSON.parse(localStorage.getItem('profile')));
    const logout = () => {
      dispatch({ type: 'LOGOUT' });
  
      history.push('/auth');
  
      setUser(null);
    };
    useEffect(()=>{
        const token=user?.token;
        
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 2000 < new Date().getTime()) logout();
    }
        setUser(JSON.parse(localStorage.getItem('profile')));
    },[location])
    console.log(user);
    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
       <div className={classes.brandContainer}> 
       <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Sous-Chef!</Typography>
        <img className={classes.image} src={cooking} alt="sous-Chef" height="60"/></div>
        <Toolbar className={classes.toolbar}>
        {user? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} style={{fontFamily:'serif',fontWeight:'bold'}} variant="h6">{user.result.name}</Typography>
            <Button variant="contained" className={classes.logout} style={{background:'black',color:'white'}} onClick={()=>{dispatch({type:'LOGOUT'}); history.push("/");setUser(null);}}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" style={{background:'black',color:'white'}}>Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
    )

}
export default Navbar;