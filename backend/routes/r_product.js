const express=require("express");
const {getAllproducts}=require("../controllers/c_product")

const router=express.Router();

router.route("/all").get(getAllproducts)

module.exports=router;