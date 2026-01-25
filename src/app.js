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
    res.status(500).send("Error in saving user");
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
app.patch("/user",async(req,res)=>{
   const userId=req.body.userId;
   const data=req.body;
   try{
      const user=await User.findByIdAndUpdate({_id:userId},data,{returnDocument:"after"});
      res.send("User updated successfully");
   }
    catch(err){
         res.status(500).send("Something went wrong");
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



