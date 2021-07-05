import dotenv from 'dotenv'
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import pr from './routes/posts.js';
import ur from './routes/users.js';
const app = express();
dotenv.config();
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
app.use('/posts',pr);
app.use('/users',ur);
const CONNECT_URL=process.env.URL
const PORT= process.env.PORT || 5000;
mongoose.connect(CONNECT_URL,{useNewUrlParser:true,useUnifiedTopology:true})
  .then(() => app.listen(PORT, () => console.log(`Server started at ${PORT}`)))
  .catch((error) => console.log(`error code:${error}`));

mongoose.set('useFindAndModify', false);
