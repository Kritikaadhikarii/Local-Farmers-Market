// importing necessary modules
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// defining user schema along with user details
const userSchema = new mongoose.Schema({
  name: {type: String, required: [true, "Please enter your name!"],},
  email: { type: String, required: [true, "Please enter your email!"],},
  password: { type: String, required: [true, "Please enter your password"], minLength: [4, "Password should be greater than 4 characters"], select: false,},
  address: { type: String, },
  role: { type: String, default: "user",},
  avatar: { type: String, required: true, },
  createdAt: { type: Date, default: Date.now(), },
  resetPasswordToken: String,
  resetPasswordTime: Date,
});

//  Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  // Hashing the password using bcrypt with a salt of 10 rounds
  this.password = await bcrypt.hash(this.password, 10);
});

// jwt token generation method for the user
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// comparing entered password with hashed passowrd
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// exporting user model for further use
module.exports = mongoose.model("User", userSchema);
