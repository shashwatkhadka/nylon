const User = require("../models/m_user");
const bcrypt = require('bcryptjs');

// Register a User
exports.registerUser = async (req, res, next) => {
  const userm=await User.create(req.body);

  const token=userm.getJWTToken();//getjWT token for created "user'"

  res.status(201).json({success:true,token, userm})
  
};

//Login User
exports.loginUser=async(req,res,next)=>{
  const {email,password}=req.body;

  if(!email || !password){
    return res.status(400).json({success:true,message:"Enter Email & Password"})
  }

  const userm=await User.findOne({email}).select("+password");
  //since we have set "select:false" for password, we have to ask for password explicitly

  if(!userm){
    return res.json("Incorrect Email/Password")
  }

  const isPasswordMatched= async function (password) {
    return await bcrypt.compare(password, this.password);//compare(data,encrypted)
  };                             //password is from the req.body, this.password is password for this user from the DB

  if(!isPasswordMatched){
    return res.status(401).json("Incorrect Email/Password")
  }

  const token=userm.getJWTToken();
  res.status(201).json({success:true,token})

}


