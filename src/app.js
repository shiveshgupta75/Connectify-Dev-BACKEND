const express=require('express');
const app=express();

//GET
app.get("/user",(req,res)=>{
    res.send("GET DATA FROM SERVER");

});

app.get("/data",(req,res)=>{
    console.log(req.query)
    res.send("GET DATA FROM SERVER");

});

app.get("/username/:userId/:name/:password",(req,res)=>{
    console.log(req.params)
    res.send({firstname:"Shivesh",lastname:"Gupta"});

});
//POST
app.post("/user",(req,res)=>{
    console.log(req.body);
    res.send("POST Call for /user!! Data saved successfully");
});
//DELETE
app.delete("/user",(req,res)=>{
    console.log("Data deleted successfully");
    res.send("DELETE Call for /user");
});
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