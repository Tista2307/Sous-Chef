import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/users.js'
 
export const signin= async(req,res)=>{
    try{
    const {email,password}=req.body;
    const isuser=await User.findOne({email});
    if(!isuser){res.status(404).json({message:"User not present!"})}
    const isValidp = await bcrypt.compare(password, isuser.password);
    if (!isValidp) return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign({ email: isuser.email, id: isuser._id }, 'test', { expiresIn: "2h" });

    res.status(200).json({ result: isuser, token });
}
    catch(err){
    res.status(500).json({ message: "Something went wrong" });
    }
}
export const signup= async(req,res)=>{
    const { email, password,confirmpassword, firstName, lastName } = req.body;

  try {
    const isuser = await User.findOne({ email });
    if (isuser) return res.status(400).json({ message: "User already exists" });
    if(password!==confirmpassword)return res.status(400).json({message:"Password and Confirm Password didnt match!"})
    const hashp= await bcrypt.hash(password, 12);
    const result = await User.create({ email, password: hashp, name: `${firstName} ${lastName}` });
    const token = jwt.sign( { email: result.email, id: result._id }, 'test', { expiresIn: "2h" } );
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }

}