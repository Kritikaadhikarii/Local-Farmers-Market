const Shop = require("../model/shop");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const express = require("express");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
const Withdraw = require("../model/withdraw");
const sendMail = require("../utils/sendMail");
const router = express.Router();

// create withdraw request --- only for seller
router.post(
  "/create-withdraw-request",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { amount } = req.body;
      const data = {
        seller: req.seller,
        amount,
      };

      const withdraw = await Withdraw.create(data);
      const shop = await Shop.findById(req.seller._id);
      shop.availableBalance -= amount;
      await shop.save();

      res.status(201).json({
        success: true,
        message: `Your withdraw request of ${amount}$ is processing. It will take 3 to 7 days to process.`,
        withdraw,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);


// get all withdraws --- admnin

router.put(
  "/update-withdraw-request/:id",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { sellerId } = req.body;
      const withdraw = await Withdraw.findByIdAndUpdate(
        req.params.id,
        { status: "succeed", updatedAt: Date.now() },
        { new: true }
      );

      const seller = await Shop.findById(sellerId);
      const transaction = {
        _id: withdraw._id,
        amount: withdraw.amount,
        updatedAt: withdraw.updatedAt,
        status: withdraw.status,
      };

      seller.transactions = [...seller.transactions, transaction];
      await seller.save();

      res.status(201).json({
        success: true,
        message: `The withdraw request for ${withdraw.amount}$ has been processed successfully.`,
        withdraw,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update withdraw request ---- admin
router.put(
  "/update-withdraw-request/:id",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { sellerId } = req.body;

      const withdraw = await Withdraw.findByIdAndUpdate(
        req.params.id,
        {
          status: "succeed",
          updatedAt: Date.now(),
        },
        { new: true }
      );

      const seller = await Shop.findById(sellerId);

      const transaction = {
        _id: withdraw._id,
        amount: withdraw.amount,
        updatedAt: withdraw.updatedAt,
        status: withdraw.status,
      };

      seller.transactions = [...seller.transactions, transaction];

      await seller.save();

      res.status(201).json({
        success: true,
        message: `Withdrawal of ${withdraw.amount}$ for ${seller.name} has been processed successfully.`,
        withdraw,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
