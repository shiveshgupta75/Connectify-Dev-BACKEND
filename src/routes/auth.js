const express=require("express");
const authRouter=express.Router();
const User=require("../models/user"); 
const {validateSignUpData}=require("../utils/validation");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

authRouter.post("/signup",async(req,res)=>{
      try{
         //Validation of data
         validateSignUpData(req);

         const {firstName,lastName,password,emailId}=req.body;

         //encryption of password
         const hashpassword=await bcrypt.hash(password,10);
         
         // creation of instance of user
         const user=new User({
            firstName,
            lastName,
            emailId,
            password:hashpassword
         });
    await user.save();
  res.send("User Added Successfully");
 } catch(err){
    res.status(500).send("Error in saving user"+ err.message);
 }

});

authRouter.post("/login",async(req,res)=>{
 try{
      const {emailId,password}=req.body;
      const user= await User.findOne({emailId:emailId});
      if(!user){
         throw new Error("Invalid credentials")
      }
      const isPasswordValid=await user.verifyPassword(password);
      if(isPasswordValid){
         // create a JWT token
         const token =  await user.getJWT();
         

         // Add jwt token in cookie and send back to user
         res.cookie("token",token);
        res.send("Login Successful");
      }
      else{
          throw new Error("Invalid credentials");
      }
 }
 catch(err){
         res.status(500).send("ERROR :"+ err.message);
      }
}); 

authRouter.post("/logout",async(req,res)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
    });
    res.send("Logout Sucessfully");
});

module.exports=authRouter;