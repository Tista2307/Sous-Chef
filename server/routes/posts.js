import express from 'express';
import {getpost,createpost,updatepost,deletepost,likepost,searchpost,getpostdetails,postcomment} from '../controllers/controlp.js'
import auth from '../middleware/auth.js'
const r=express.Router();
r.get("/",getpost)
r.get("/search",searchpost)
r.get("/:id",getpostdetails)
r.post("/",auth,createpost)
r.patch("/:id",auth,updatepost)
r.delete("/:id",auth,deletepost)
r.patch("/:id/likedpost",auth,likepost)
r.post("/:id/commentPost",auth,postcomment)
export default r;