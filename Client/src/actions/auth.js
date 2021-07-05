import * as api from '../api';//exporting api


export const signin = (formdata,history) => async(dispatch)=>{
    try{
        const { data } = await api.signIn(formdata);

        dispatch({ type: 'AUTH', payload:data });
        history.push("/")
    }
    catch(error){
        console.log(error);
    }
}

export const signup = (formdata,history) => async(dispatch)=>{
    try{
        const { data } = await api.signUp(formdata);

        dispatch({ type: 'AUTH', payload:data });
        history.push("/")
    }
    catch(error){
        console.log(error);
    }
}

