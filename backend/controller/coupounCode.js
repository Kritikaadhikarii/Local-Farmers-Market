const express = require("express");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const { isSeller } = require("../middleware/auth");
const CoupounCode = require("../model/coupounCode");
const router = express.Router();

// Route to create a new coupon code
router.post(
  "/create-coupon-code",
  isSeller, // Middleware to check if the user is a seller
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Check if a coupon code with the same name already exists
      const isCoupounCodeExists = await CoupounCode.find({
        name: req.body.name,
      });

      // If the coupon code exists, throw an error
      if (isCoupounCodeExists.length !== 0) {
        return next(new ErrorHandler("Coupon code already exists!", 400));
      }

      // Create a new coupon code with the request body data
      const coupounCode = await CoupounCode.create(req.body);

      // Send a success response with the created coupon code
      res.status(201).json({
        success: true,
        coupounCode,
      });
    } catch (error) {
      // Handle any errors that occur during the creation process
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Route to get all coupon codes for a specific shop
router.get(
  "/get-coupon/:id",
  isSeller, // Middleware to check if the user is a seller
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Find all coupon codes associated with the seller's shop ID
      const couponCodes = await CoupounCode.find({ shopId: req.seller.id });

      // Send a success response with the found coupon codes
      res.status(201).json({
        success: true,
        couponCodes,
      });
    } catch (error) {
      // Handle any errors that occur during the retrieval process
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Route to delete a coupon code by its ID
router.delete(
  "/delete-coupon/:id",
  isSeller, // Middleware to check if the user is a seller
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Find and delete the coupon code by its ID
      const couponCode = await CoupounCode.findByIdAndDelete(req.params.id);

      // If the coupon code does not exist, throw an error
      if (!couponCode) {
        return next(new ErrorHandler("Coupon code doesn't exist!", 400));
      }

      // Send a success response confirming the deletion
      res.status(201).json({
        success: true,
        message: "Coupon code deleted successfully!",
      });
    } catch (error) {
      // Handle any errors that occur during the deletion process
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Route to get the value of a coupon code by its name
router.get(
  "/get-coupon-value/:name",
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Find the coupon code by its name
      const couponCode = await CoupounCode.findOne({ name: req.params.name });

      // Send a success response with the found coupon code
      res.status(200).json({
        success: true,
        couponCode,
      });
    } catch (error) {
      // Handle any errors that occur during the retrieval process
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;
