//module import
const express=require("express");
const app=express();
app.use(express.json());

//route import
const productroute=require("./routes/r_product");
const userroute=require("./routes/r_user");

app.use("/product",productroute);
app.use("/auth",userroute)

module.exports=app;