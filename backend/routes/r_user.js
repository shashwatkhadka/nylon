const express = require("express");
const {registerUser,loginUser, logoutUser, getuserdetail}=require("../controllers/c_user")
const { isLoggedinUser} = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);//not working when registerUser in line 2 was not kept inside{}
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/me").get(isLoggedinUser,getuserdetail);

module.exports = router;