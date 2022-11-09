const Product=require("../models/m_product")

//create product
exports.createproduct=async(req,res,next)=>{
    const product=await Product.create(req.body);

    res.status(201).json({success:true, product})
}

exports.getAllproducts=(req,res)=>{
    res.status(200).json({message:"Route is Working"})
}