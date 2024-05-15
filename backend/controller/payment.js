const express = require("express");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Route to process a payment
router.post(
  "/process",
  catchAsyncErrors(async (req, res, next) => {
    // Create a payment intent with Stripe
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount, // The payment amount in smallest currency unit (e.g., paise for INR)
      currency: "inr", // The currency of the payment
      // metadata: {
      //   userId: "acct_1PDrCkRqeFjYRFa7", // Optional: metadata for additional information
      // },
    });

    // Send the client secret of the payment intent to the client
    res.status(200).json({
      success: true,
      client_secret: myPayment.client_secret,
    });
  })
);

// Route to get the Stripe API key
router.get(
  "/stripeapikey",
  catchAsyncErrors(async (req, res, next) => {
    // Send the Stripe API key to the client
    res.status(200).json({ stripeApikey: process.env.STRIPE_API_KEY });
  })
);

module.exports = router;
