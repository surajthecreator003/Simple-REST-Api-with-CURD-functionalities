
const express=require("express");
const mongoose=require("mongoose");

const Product=require("./models/products_model");

const app=express();

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.get("/blog",(req,res)=>{
    res.send("Heyyyyyyyyyyyy its blog");
})

app.get("/product",async(req,res)=>{
    try{
        const products=await Product.find({})
        res.status(200).json(products)
    }
    catch(err){
       console.log(err.message);
       res.status(500).json({message:err.message});
    }
})

app.get("/product/:id",async(req,res)=>{
       try{
        const {id}=req.params;
        const product=await Product.findById(id);
        res.status(200).json(product);

       }
       catch(err){console.log(err.message);
        res.status(500).json({message:err.message})}
})

app.post("/product",async(req,res)=>{

    try{ const product=await Product.create(req.body);
    res.status(200).json(product);
    console.log(req.body);//will print the request we sent from postman
}
    catch(err){
        console.log(err);
        res.status(500).json({message:err.message});
    }
   
})

app.put("/product/:id",async (req,res)=>{
    try{
        const {id}=req.params;
        const product=await Product.findByIdAndUpdate(id,req.body);

        if(!product){
           res.status(404).json({message:"cannot find your id order"})
        }
        const updatedproduct=await Product.findById(id);
        res.status(200).json(updatedproduct);
    }
    catch(err){res.status(500).json({message:err.message})}
})

app.delete("/product/:id",async(req,res)=>{
    try{
       const {id}=req.params;
       const product=await Product.findByIdAndDelete(id);
       if(! product){
        res.status(404).json({message:"cant find the product with same id"})
       }
       const updated=await Product.find({})
       res.status(200).json(updated);
    }
    catch(err){
        res.status(500).json({message:err.message})

    }
})




mongoose.connect("mongodb+srv://discodavinci:cringe@cluster0.9avlvsp.mongodb.net/my-collection?retryWrites=true&w=majority")

.then(()=>{console.log("conncted to database");
           app.listen(3009,()=>{console.log("node server runninh")});})

.catch((err)=>{console.log(err)})

