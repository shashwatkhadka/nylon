const mongoose = require("mongoose");

const validator = require("validator"); //validator to validate email field
const bcrypt = require("bcryptjs"); //bcrypt hashes password
const jwt = require("jsonwebtoken"); //generate token and store it in cookie, to verify during login


const userSchema = new mongoose.Schema({
    fname: {
      type: String,
      required: [true, "Enter Your FirstName"],
    },
    lname: {
        type: String,
        required: [true, "Enter Your LastName"],
      },
    email: {
      type: String,
      required: [true, "Enter Your Email"],
      unique: true,//different mail, for different users
      validate: [validator.isEmail, "Enter a valid Email"],
    },
    password: {
      type: String,
      required: [true, "Enter Your Password"],
      minLength: [8, "Password lenght must be >8"],
      select: false,//does not return password field when user model is searched, has to be expilicitly stated to return password 
    },
    /*avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },*/
    role: {
      type: String,
      default: "user",
    },
  });
  
  userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
  });
  //using this function, before saving the userModel, the object which we are saving
  //it's password will be hashed with a bcrypt strength 10(recommended)
  
  // JWT TOKEN
  userSchema.methods.getJWTToken = function (){
    return jwt.sign({ id: this._id }, "shashwat", {expiresIn: "172800000"});
  };//shashwat is kept in place of secret key, it should be kept in config.env


  // Compare Password
  userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);//compare(data,encrypted)
  };//return true/false
   
  module.exports = mongoose.model("User", userSchema);
  