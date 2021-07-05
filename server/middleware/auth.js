import jwt,{decode} from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const auth = (req,res,next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const customauth = token.length < 500;
    
        let decodeD;
    
        if (token && customauth) {      
            decodeD = jwt.verify(token, process.env.SECRET);
    
          req.userId = decodeD?.id;
          
        } else {
            decodeD = jwt.decode(token);
    
          req.userId = decodeD?.sub;
        }    
    
        next();
      } catch (error) {
        console.log(error);
      }
}

export default auth
