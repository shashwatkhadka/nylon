const jwt=require("jsonwebtoken");
const { $where } = require("../models/m_user");
const m_user = require("../models/m_user");

exports.isLoggedinUser=async(req,res,next)=>{
    const {token}=req.cookies;
    //accessing token that is stored in cookie, during login/registration

    if(!token){
        return res.status(401).json({message:"Please Login to acces this resource"})
    }
    //if there is no token, user has to login to access it

    const decodedData=jwt.verify(token,"shashwat")
    //when creating jwtToken, we assigned user's id to the token
    //accessing that id
    req.user=await m_user.findById(decodedData.id);

    next();
}

exports.authoriseRole=(...roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(req.user.role)){
            res.status(403).json({message:"Not Allowed to Handle this resource"})
        }
        next();
    }
}