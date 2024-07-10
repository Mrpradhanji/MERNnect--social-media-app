//authorization means the actions can be taken by a user after logged in succesfully(authentication user)
import jwt from "jsonwebtoken";
//next to allow function continues
export const verifyToken = async (req, res, next) =>{
    try {
        let token = req.header("Authorization");

        if(!token){
            res.state(403).send("Access Denied")
        }
        
        if(token.startsWith("Bearer ")){
            token = token.slice(7, token.length).trimLeft()
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
        
    } catch (error) {
        res.state(500).json({ error: err.message});
        
    }
}