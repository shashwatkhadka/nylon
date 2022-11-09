const Product=require("../models/m_product")

//create product
exports.createproduct=async(req,res,next)=>{
    const product=await Product.create(req.body);

    res.status(201).json({success:true, product})
}

//get product
exports.getAllproducts=async(req,res)=>{
    const allproducts=await Product.find();

    res.status(200).json({success:true,allproducts})
}