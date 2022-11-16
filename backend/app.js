//module import
const express=require("express");
const app=express();
const cookieParser=require("cookie-parser")

app.use(express.json());
app.use(cookieParser());

//route import
const productroute=require("./routes/r_product");
const userroute=require("./routes/r_user");

app.use("/product",productroute);
app.use("/auth",userroute)

module.exports=app;