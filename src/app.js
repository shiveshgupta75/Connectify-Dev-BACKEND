const express=require('express');
const app=express();
const {adminAuth,UserAuth}=require("./middlewares/auth.js");

//Handle Auth Middleware for all GET,POST,PATCH,...request
 app.use("/admin",adminAuth);
 app.get("/user",UserAuth,(req,res)=>{
    res.send("User Data Sent");
 });
 app.get("/admin/getAllData",(req,res)=>{
    res.send("All Data Sent");
 });
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})  