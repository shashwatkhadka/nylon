const express=require("express");
const {getAllproducts, createproduct, updateproduct, deleteproduct, getproductdetail, searchProduct}=require("../controllers/c_product");
const { isLoggedinUser,authoriseRole } = require("../middleware/auth");

const router=express.Router();

router.route("/all").get(getAllproducts);

router.route("/new").post(isLoggedinUser, authoriseRole("admin"),createproduct);//login,admin
router.route("/:id").put(isLoggedinUser, authoriseRole("admin"),updateproduct);//login,admin
router.route("/:id").delete(isLoggedinUser, authoriseRole("admin"),deleteproduct);//login,admin
router.route("/:id").get(getproductdetail);

router.route("/search/:key").get(searchProduct)


module.exports=router;