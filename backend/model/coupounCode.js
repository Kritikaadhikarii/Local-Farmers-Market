const mongoose = require("mongoose");

// Define the schema for coupon codes
const coupounCodeSchema = new mongoose.Schema({
    // Name of the coupon code
    name: {
        type: String,
        required: [true, "Please enter your coupon code name!"],
        unique: true, // Ensure uniqueness of coupon code names
    },
    // Value of the coupon code (e.g., discount percentage or fixed value)
    value: {
        type: Number,
        required: true,
    },
    // Minimum amount required for the coupon code to be applicable
    minAmount: {
        type: Number,
    },
    // Maximum amount for which the coupon code is applicable
    maxAmount: {
        type: Number,
    },
    // ID of the shop associated with the coupon code
    shopId: {
        type: String,
        required: true,
    },
    // Selected product (optional) for which the coupon code is applicable
    selectedProduct: {
        type: String,
    },
    // Timestamp indicating when the coupon code was created
    createdAt: {
        type: Date,
        default: Date.now(), // Default value is the current timestamp
    }
});

// Create and export the CouponCode model based on the schema
module.exports = mongoose.model("CoupounCode", coupounCodeSchema);
