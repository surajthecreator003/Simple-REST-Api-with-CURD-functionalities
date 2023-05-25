//model for my data model
const mongoose=require("mongoose");

const product_schema=mongoose.Schema({
    name:{type:String,default:"lol",required:true},
    price:{type:Number,default:0,required:true}
});

const Product=mongoose.model("Product",product_schema);

module.exports=Product;