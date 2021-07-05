import express from 'express';
import {signin,signup} from '../controllers/controlu.js'
const r=express.Router();
r.post("/signin",signin);
r.post("/signup",signup);
export default r;