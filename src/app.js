const express=require('express');
const connectDB=require("./config/database");
const User=require("./models/user"); 
const app=express();
 app.use(express.json());
app.post("/signup",async(req,res)=>{
      const user=new User(req.body);
    
 try{
    await user.save();
  res.send("User Added Successfully");
 } catch(err){
    res.status(500).send("Error in saving user"+ err.message);
 }

});
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
app.get("/feed",async(req,res)=>{
   try{
      const user=await User.find({});
      res.send(user);
   }
   catch(err){
         res.status(500).send("Something went wrong");
      }
});

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



