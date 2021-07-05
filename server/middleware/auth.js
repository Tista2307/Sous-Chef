import jwt,{decode} from 'jsonwebtoken'

const auth = (req,res,next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const customauth = token.length < 500;
    
        let decodeD;
    
        if (token && customauth) {      
            decodeD = jwt.verify(token, 'test');
    
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
