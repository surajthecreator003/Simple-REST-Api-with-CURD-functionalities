
const express=require("express");

const app=express();

app.get("/",(req,res)=>{
    res.send("Hello World")
})

app.listen(3009,()=>{console.log("node server runninh")});

