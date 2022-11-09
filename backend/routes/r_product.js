const express=require("express");
const {getAllproducts, createproduct}=require("../controllers/c_product")

const router=express.Router();

router.route("/all").get(getAllproducts)
router.route("/new").post(createproduct)

module.exports=router;