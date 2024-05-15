const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    // Array containing the items in the user's cart
    cart: {
        type: Array,
        required: true,
    },
    // Shipping address of the order
    shippingAddress: {
        type: Object,
        required: true,
    },
    // Details of the user who placed the order
    user: {
        type: Object,
        required: true,
    },
    // Total price of the order
    totalPrice: {
        type: Number,
        required: true,
    },
    // Status of the order (default is "Processing")
    status: {
        type: String,
        default: "Processing",
    },
    // Payment information associated with the order
    paymentInfo: {
        id: {
            type: String,
        },
        status: {
            type: String,
        },
        type: {
            type: String,
        },
    },
    // Date and time when the order was paid for
    paidAt: {
        type: Date,
        default: Date.now(),
    },
    // Date and time when the order was delivered
    deliveredAt: {
        type: Date,
    },
    // Timestamp indicating when the order was created
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model("Order", orderSchema);
