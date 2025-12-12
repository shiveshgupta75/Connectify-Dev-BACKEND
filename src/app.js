const express=require('express');
const app=express();

app.use("/hello",(req,res)=>{
    res.send("Hello2 hello2 hello2");
});
app.use("/hello/2",(req,res)=>{
    res.send("Hello hello hello");
});

app.use("/",(req,res)=>{
    res.send("Welcome to Connectify API");
});
app.use("/login",(req,res)=>{
    res.send("login route");
});
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})