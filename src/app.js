const express=require('express');
const app=express();
const {adminAuth,UserAuth}=require("./middlewares/auth.js");


//  app.use("/admin",adminAuth);
//  app.use
//  app.post("/user/login",(req,res)=>{
//   res.send("User logged in successfully");
//  });
//  app.get("/user",UserAuth,(req,res)=>{
//     res.send("User Data Sent");
//  });
//  app.get("/admin/getAllData",(req,res)=>{
//     res.send("All Data Sent");
//  });

app.use("/getUserData",(req,res)=>{
     try{
        throw new error("cjsbjb");
        res.send("User Data Sent");
     }
     catch(err){
         res.status(500).send("something went wrong");
     }
    

});
app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("something went wrong");    }

});
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})  