import React,{useState} from 'react'
import { Avatar,Button,Paper,Grid,Typography,Container } from '@material-ui/core';
import LockRoundedIcon from '@material-ui/icons/LockRounded';
import {GoogleLogin} from 'react-google-login'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import dotenv from 'dotenv'
import Icon from './icon';
import Setfield from './setfield.js'
import useStyles from './styles.js'
import {signin,signup} from '../actions/auth.js'
dotenv.config() 
const Auth = () => {
    const classes=useStyles();
    const dispatch=useDispatch();
    const [issignup, setissignup] = useState(false);
    const [formdata,setformdata]=useState({firstName:'',lastName:'',email:'',password:'',confirmpassword:''})
    const history=useHistory();
    const handleSubmit=(e)=>{
      e.preventDefault();
      if(issignup){
        dispatch(signup(formdata,history))
      }
      else{
        dispatch(signin(formdata,history))
      }
      
    }
    const makeChange=(e)=>{
    setformdata({...formdata,[e.target.name]:e.target.value})
    console.log(formdata);

    }
    const googleSuccess=async (res)=>{
        const result = res?.profileObj;
        const token = res?.tokenId;
    
        try {
          dispatch({ type: 'AUTH', payload: { result, token } });
          history.push("/")
        }
        catch (error) {
            console.log(error);
          }  
    }
    const googleError=()=>{

        console.log('Unsuccessful login with google.Try later!');
    }
    const [viewPassword, setviewPassword] = useState(false);
    const switchMode = () => {
        setissignup((prevIsSignup) => !prevIsSignup);
        setviewPassword(false);
      };
   
    const handleShowPassword = () => setviewPassword((prevviewp)=>!prevviewp);
    return (
       <Container component="main" maxWidth="xs">
           <Paper className={classes.paper}>
            <Avatar className={classes.avatar}style={{background:"black",color:"white"}}>
                <LockRoundedIcon/>
            </Avatar>
            <Typography variant="h5">{issignup?'Sign Up':'Sign In'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                { issignup && (
             <>
              <Setfield name="firstName" label="First Name" makeChange={makeChange} autoFocus half />
              <Setfield name="lastName" label="Last Name" makeChange={makeChange} half />
             </>
            )}
            <Setfield name="email" label="Email Address" makeChange={makeChange} type="email" />
            <Setfield name="password" label="Password" makeChange={makeChange} type={viewPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { issignup && <Setfield name="confirmpassword" label="Repeat Password" makeChange={makeChange} type="password" /> }
          </Grid>
          <Button type="submit" fullWidth style={{background:"black",color:"white"}} variant="contained" color="primary" className={classes.submit}>
            { issignup ? 'Sign Up' : 'Sign In' }
          </Button>
          <GoogleLogin
            clientId={process.env.REACT_APP_CLIENT_ID}
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
             Sign In With Google  
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
          <Grid container justify="center">
            <Grid item>
              <Button onClick={switchMode}>
                { issignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>

            </Grid>
          </Grid>
            </form>
           </Paper>
       </Container>
    )
}

export default Auth;
