const express=require('express');
const connectDB=require("./config/database");
const User=require("./models/user"); 
const {validateSignUpData}=require("./utils/validation");
const bcrypt=require("bcrypt");
const app=express();
const cookieParser=require("cookie-parser");
const jwt=require("jsonwebtoken");
const { UserAuth } = require('./middlewares/auth');
 app.use(express.json());
 app.use(cookieParser());

app.post("/signup",async(req,res)=>{
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

app.post("/login",async(req,res)=>{
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

app.get("/profile", UserAuth,async(req,res)=>{
   try{
      const user=req.user;
      res.send(user);
} catch(err){
         res.status(500).send("ERROR :"+ err.message);
}
});

app.post("/sendConnectionRequest",UserAuth,async(req,res)=>{
   const user=req.user
   console.log("Send a connection request");
   res.send(user.firstName+" sent the connection request!");
})

connectDB()
         .then(()=>{
                console.log('Database connected successfully');
                app.listen(3000,()=>{
                console.log('Server is running on port 3000');
                })  
             })
             .catch((err)=>{
                console.log('Database connection failed');
             });



