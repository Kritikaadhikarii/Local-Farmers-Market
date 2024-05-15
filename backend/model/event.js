const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    // Name of the event product
    name: {
        type: String,
        required: [true, "Please enter your event product name!"],
    },
    // Description of the event product
    description: {
        type: String,
        required: [true, "Please enter your event product description!"],
    },
    // Category of the event product
    category: {
        type: String,
        required: [true, "Please enter your event product category!"],
    },
    // Start date of the event
    start_Date: {
        type: Date,
        required: true,
    },
    // Finish date of the event
    Finish_Date: {
        type: Date,
        required: true,
    },
    // Status of the event (e.g., "Running", "Ended")
    status: {
        type: String,
        default: "Running",
    },
    // Tags associated with the event product
    tags: {
        type: String,
    },
    // Original price of the event product
    originalPrice: {
        type: Number,
    },
    // Discounted price of the event product
    discountPrice: {
        type: Number,
        required: [true, "Please enter your event product price!"],
    },
    // Stock quantity of the event product
    stock: {
        type: Number,
        required: [true, "Please enter your event product stock!"],
    },
    // URLs of images associated with the event product
    images: [{
        type: String,
    }],
    // ID of the shop associated with the event product
    shopId: {
        type: String,
        required: true,
    },
    // Details of the shop associated with the event product
    shop: {
        type: Object,
        required: true,
    },
    // Number of items sold out
    sold_out: {
        type: Number,
        default: 0,
    },
    // Timestamp indicating when the event product was created
    createdAt: {
        type: Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model("Event", eventSchema);
