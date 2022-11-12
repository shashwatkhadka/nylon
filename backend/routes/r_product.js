const express=require("express");
const {getAllproducts, createproduct, updateproduct, deleteproduct, getproductdetail, searchProduct}=require("../controllers/c_product")

const router=express.Router();

router.route("/all").get(getAllproducts);
router.route("/new").post(createproduct);
router.route("/:id").put(updateproduct);
router.route("/:id").delete(deleteproduct);
router.route("/:id").get(getproductdetail);

router.route("/search/:key").get(searchProduct)


module.exports=router;