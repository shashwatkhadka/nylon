const Product=require("../models/m_product")
const ApiFeature=require("../utils/apifeatures")

//get all product(without result per page limit)
exports.getAllproducts=async(req,res)=>{
    const allproducts=await Product.find();

    res.status(200).json({success:true,allproducts})
}

//pagination
exports.getpagination_products=async(req,res)=>{
    const resultPerPage=3;
    const productCount=await Product.countDocuments();

    const apiFeature=new ApiFeature(Product.find(),req.query).pagination(resultPerPage)
    
    const pagination_products=await apiFeature.query;

    res.status(200).json({success:true,pagination_products,productCount})
}

//search products
exports.searchProduct=async(req,res)=>{
    let data =await Product.find({"$or":[{prodname:{$regex:req.params.key,$options:'i'}},{description:{$regex:req.params.key,$options:'i'}},{category:{$regex:req.params.key,$options:'i'}}
    ]})

    res.send(data)

}

//create product
exports.createproduct=async(req,res,next)=>{
    const product=await Product.create(req.body);

    res.status(201).json({success:true, product})
}

//update product
exports.updateproduct=async(req,res)=>{
    let product=await Product.findById(req.params.id);
    //storing the info about the product in "product" by searching
    //in the database by the product's "id" 

    if(!product){
        return res.status(500).json({success:false,message:"Product not found"})
    }

    product= await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindandModify:false
    })

    res.status(200).json({success:true, product})
}

//delete product
exports.deleteproduct=async(req,res,next)=>{
    const product=await Product.findById(req.params.id);

    if(!product){
        return res.status(500).json({success:false,message:"Product not found"})
    }

    await Product.remove();

    res.status(200).json({success:true, message:"Product Deleted Successfully"})
}

//get product detail
exports.getproductdetail=async(req,res)=>{
    const product=await Product.findById(req.params.id);

    if(!product){
        return res.status(500).json({success:false,message:"Product not found"})
    }

    res.status(200).json({success:true, product})
}