const express=require('express');
const connectDB=require("./config/database");
const User=require("./models/user"); 
const app=express();

app.post("/signup",async(req,res)=>{
       const user=new User({
        firstName:"MS",
        lastName:"DHONI",
        emailId:"msd23@gmail.com",
        password:"msd123"
       });
 try{
    await user.save();
  res.send("User Added Successfully");
 } catch(err){
    res.status(500).send("Error in saving user");
 }

});
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



