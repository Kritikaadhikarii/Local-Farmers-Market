const express = require("express");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { upload } = require("../multer");
const Shop = require("../model/shop");
const Event = require("../model/event");
const ErrorHandler = require("../utils/ErrorHandler");
const { isSeller, isAdmin, isAuthenticated } = require("../middleware/auth");
const router = express.Router();
const fs = require("fs");

// Route to create a new event
router.post(
  "/create-event",
  upload.array("images"), // Middleware for handling file uploads
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);

      // Check if the shop ID is valid
      if (!shop) {
        return next(new ErrorHandler("Shop Id is invalid!", 400));
      } else {
        const files = req.files;
        const imageUrls = files.map((file) => `${file.filename}`);

        const eventData = req.body;
        eventData.images = imageUrls;
        eventData.shop = shop;

        // Create a new event with the provided data
        const product = await Event.create(eventData);

        res.status(201).json({
          success: true,
          product,
        });
      }
    } catch (error) {
      // Handle any errors that occur during the event creation process
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Route to get all events
router.get("/get-all-events", async (req, res, next) => {
  try {
    const events = await Event.find();
    res.status(201).json({
      success: true,
      events,
    });
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    return next(new ErrorHandler(error, 400));
  }
});

// Route to get all events of a specific shop by shop ID
router.get(
  "/get-all-events/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const events = await Event.find({ shopId: req.params.id });

      res.status(201).json({
        success: true,
        events,
      });
    } catch (error) {
      // Handle any errors that occur during the retrieval process
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Route to delete an event by its ID
router.delete(
  "/delete-shop-event/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const productId = req.params.id;
      const eventData = await Event.findById(productId);

      // Delete event images from the file system
      eventData.images.forEach((imageUrl) => {
        const filename = imageUrl;
        const filePath = `../uploads/${filename}`;

        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(err);
          }
        });
      });

      // Delete the event from the database
      const event = await Event.findByIdAndDelete(productId);

      if (!event) {
        return next(new ErrorHandler("Event not found with this id!", 500));
      }

      res.status(201).json({
        success: true,
        message: "Event Deleted successfully!",
      });
    } catch (error) {
      // Handle any errors that occur during the deletion process
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Route to get all events for admin
router.get(
  "/admin-all-events",
  isAuthenticated, // Middleware to check if the user is authenticated
  isAdmin("Admin"), // Middleware to check if the user is an admin
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Get all events sorted by creation date in descending order
      const events = await Event.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        events,
      });
    } catch (error) {
      // Handle any errors that occur during the retrieval process
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
