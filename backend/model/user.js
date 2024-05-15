const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  // Name of the user
  name: {
    type: String,
    required: [true, "Please enter your name!"],
  },
  // Email address of the user
  email: {
    type: String,
    required: [true, "Please enter your email!"],
  },
  // Password of the user (hashed)
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [4, "Password should be greater than 4 characters"],
    select: false, // Password won't be returned in queries by default
  },
  // Phone number of the user
  phoneNumber: {
    type: Number,
  },
  // Array of user addresses
  addresses: [{
    country: {
      type: String,
    },
    city: {
      type: String,
    },
    address1: {
      type: String,
    },
    address2: {
      type: String,
    },
    zipCode: {
      type: Number,
    },
    addressType: {
      type: String,
    },
  }],
  // Role of the user (default is "user")
  role: {
    type: String,
    default: "user",
  },
  // Avatar (profile picture) of the user
  avatar: {
    type: String,
    required: true,
  },
  // Timestamp indicating when the user was created
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

// Hash password before saving user model
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Generate JWT token for authentication
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// Compare entered password with the hashed password in the database
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
