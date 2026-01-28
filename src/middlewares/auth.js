    const jwt= require("jsonwebtoken");
    const User=require("../models/user");
    
    const UserAuth=async (req,res,next)=>{
     try{
        const {token}=req.cookies;
        if(!token){
            throw new Error("TOKEN IS NOT VALID!!!!");

        }
        const decodedobj=await jwt.verify(token,"Connectify@T");
        const{_id}=decodedobj;
        const user= await User.findById(_id);
        if(!user){
            throw new Error("USER NOT FOUND!!!!");
        }
        req.user=user;
        next();


     }
     catch(err){
        res.status(400).send("ERROR :"+ err.message);
     }
   };
   module.exports={
    UserAuth,
   }