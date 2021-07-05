import mongoose from 'mongoose';
const postSchema=mongoose.Schema({
    title:String,
    recipe:String,
    name:String,
    creator:String,
    tags:[String],
    postfile:String,
    likes:{
        type:[String],
        default:[]
    },
    comments:{
        type:[String],
        default:[]
    },
    postdate:{
        type:Date,
        default:new Date()
    }

})
const postRecipe=mongoose.model('postRecipe',postSchema)
export default postRecipe;