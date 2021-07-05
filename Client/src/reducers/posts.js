


//changing the state of my app looking at my current state
const reducer= (state={isLoading:true,posts:[]},action)=>{//posts is the current state of app
switch(action.type){
    case 'START_LOADING':
       return {...state,isLoading:true}
    case 'END_LOADING':
        return {...state,isLoading:false}
    case 'FETCH_ALL':
        return {...state,
            posts:action.payload.data,
            currPage:action.payload.currPage,
            numberofpages:action.payload.numberofpages
        }//all the data is fetched sorted by likes
    case 'CREATE':
        return {...state,posts:[...state.posts,action.payload]}
    case 'UPDATE':
        return {...state,posts:state.posts.map((post)=>post._id===action.payload._id?action.payload:post)}
    case 'DELETE':
        return {...state,posts:state.posts.filter((post)=>post._id!==action.payload)}
    case 'FETCH_SEARCH':  
         return {...state,posts:action.payload}
    case 'FETCH_POST':  
         return {...state,post:action.payload}
    case 'COMMENT':
        return {...state,posts:state.posts.map((post)=>{
        if(post._id===action.payload._id)return action.payload;
        return post;
        })}
    default:
        return state
}
}
export default reducer;