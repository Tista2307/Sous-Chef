import postRecipe from "../models/mymessages.js"
import mongoose from "mongoose";

export const getpost= async function(req,res){
    const {page}=req.query;
    try {
        const limit=9;
        const startind=(Number(page)-1)*limit;
        const tot= await postRecipe.countDocuments({});
        const recipes= await postRecipe.find().sort({id:-1}).limit(limit).skip(startind);

        res.status(200).json({data:recipes,currPage:Number(page),numberofpages:Math.ceil(tot/limit)});
        }
    catch (err){
        res.status(404).json({message:err.message});
        }
}
export const getpostdetails= async function(req,res){
const {id}=req.params;
try{
    const post=await postRecipe.findById(id);
    res.status(200).json(post);
}
catch(err){console.log(err.message)}
}
export const searchpost= async function(req,res){
    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, "i");
  
        const posts = await postRecipe.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});
        //console.log(posts)
        res.json({ data:posts });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}
export const createpost= async function(req,res){
   const obj=req.body;
   const newRecipe= postRecipe({...obj,creator:req.userId,postdate:new Date().toISOString()})
    try{await newRecipe.save();
        res.status(201).json(newRecipe);
    }
    catch (err){res.status(409).json({message:err.message});}
}
export const updatepost= async function(req,res){
    const _id=req.params.id;
    const givenpost=req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)){return res.status(404).send("No post with this id!");}
    const updatedpost= await postRecipe.findByIdAndUpdate(_id,givenpost,{new:true});
    res.json(updatedpost);
}
export const deletepost= async function(req,res){
    const _id=req.params.id;
    if(!mongoose.Types.ObjectId.isValid(_id)){return res.status(404).send("No post with this id!");}
    const x=await postRecipe.findByIdAndDelete(_id,(err,doc)=>{
        if(!err)
        console.log(`Deleted ${doc}`);
        else
        console.log(err.message);
    });
    res.json({message:'Post has been deleted'});
}
export const likepost= async function(req,res){
    const _id=req.params.id;
    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
      }
    
    if(!mongoose.Types.ObjectId.isValid(_id)){return res.status(404).send("No post with this id!");}
    const post= await postRecipe.findById(_id)
    const index = post.likes.findIndex((id) => id ===String(req.userId));
    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const x=await postRecipe.findByIdAndUpdate(_id,post,{new:true})
    res.json(x);
}
export const postcomment = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const post = await postRecipe.findById(id);

    post.comments.push(value);

    const updatedPost = await postRecipe.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
};
