const express=require('express');
const connectDB=require("./config/database");
const User=require("./models/user"); 
const {validateSignUpData}=require("./utils/validation");
const bcrypt=require("bcrypt");
const app=express();
 app.use(express.json());
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
      const userEmail= await User.findOne({emailId:emailId});
      if(!userEmail){
         throw new Error("Invalid credentials")
      }
      const isPasswordValid=await bcrypt.compare(password,userEmail.password);
      if(isPasswordValid){
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
//get user by email
app.get("/user",async(req,res)=>{
   const userEmail=req.body.emailId;
      try{
         const user =await User.find({emailId:userEmail});
         if(!user){
            res.status(404).send("User not found");
         }
         else{
            res.send(user);
      }
   }
      catch(err){
         res.status(500).send("Something went wrong");
      }
});
//FEED API
app.get("/feed",async(req,res)=>{
   try{
      const user=await User.find({});
      res.send(user);
   }
   catch(err){
         res.status(500).send("Something went wrong");
      }
});

//delete user

app.delete("/user",async(req,res)=>{
   const userId=req.body.userId;
   try{
      const userid=await User.findByIdAndDelete({_id:userId});
      res.send("User deleted successfully");

   }
   catch(err){
         res.status(500).send("Something went wrong");
      }
})
// update user
app.patch("/user/:userId",async(req,res)=>{
   const userId=req.params?.userId;
   const data=req.body;
   try{

      const ALLOWED_UPDATES=["firstName","lastName","photoUrl","skills","gender","about","age"];
      const isUpdateAllowed=Object.keys(data).every((k)=> ALLOWED_UPDATES.includes(k));
      if(!isUpdateAllowed){
         throw new Error("Updates not allowed");
      };
      if(data?.skills.Length>10){
         throw new Error("Skills cannot exceed 10");
      }
      const user=await User.findByIdAndUpdate({_id:userId},data,
         {returnDocument:"after",
            runValidators:true,
         });
      res.send("User updated successfully");
   }
    catch(err){
         res.status(500).send("Update failed"+ err.message);
      }
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



