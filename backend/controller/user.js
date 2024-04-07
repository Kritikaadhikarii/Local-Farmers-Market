const express = require("express");
const path = require("path");
const router = express.Router();
const { upload } = require("../multer");

const User = require("../model/user");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");

router.post("/create-user", upload.single("file"), async (req, res, next) => {
  const { name, email, password } = req.body;
  const userEmail = await User.findOne({ email });

  if (userEmail) {
    // If user already exists, return an error
    return next(new ErrorHandler("User already exists", 400));
  }

  // Check if file was uploaded successfully
  if (!req.file) {
    // If no file was uploaded, return an error
    return next(new ErrorHandler("Please upload a file", 400));
  }

  // File was uploaded successfully
  const filename = req.file.filename;
  const fileUrl = path.join("uploads", filename);

  const user = {
    name: name,
    email: email,
    password: password,
    avatar: fileUrl,
  };

  try {
    // Create a new user
    const newUser = await User.create(user);
    res.status(201).json({
      success: true,
      newUser,
    });
  } catch (error) {
    // If there's an error during user creation, delete the uploaded file
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.log(err);
      }
    });
    // Return an error response
    return next(new ErrorHandler("Could not create user", 500));
  }
});

module.exports = router;
