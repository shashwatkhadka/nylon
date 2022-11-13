const express = require("express");
const {registerUser,loginUser}=require("../controllers/c_user")

const router = express.Router();

router.route("/register").post(registerUser);//not working when registerUser in line 2 was not kept inside{}
router.route("/login").post(loginUser);

module.exports = router;