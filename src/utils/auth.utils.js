import { AuthenticationError } from "apollo-server";
import jwt from "jsonwebtoken";


export const getUser = (req) => {
    
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.replace('Bearer ', '');
        if (!token) {
            throw new Error('No token found');
        }
        try{
            const user = jwt.verify(token, "ABCDEF")
            return user
        } catch(err){
            throw new AuthenticationError("Invalid/Expired Token, please login again with correct credentials")
        }
    
    }
     
  
    throw new Error('Not authenticated');
  }