const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  // Name of the product
  name: {
    type: String,
    required: [true, "Please enter your product name!"],
  },
  // Description of the product
  description: {
    type: String,
    required: [true, "Please enter your product description!"],
  },
  // Category of the product
  category: {
    type: String,
    required: [true, "Please enter your product category!"],
  },
  // Tags associated with the product
  tags: {
    type: String,
  },
  // Original price of the product
  originalPrice: {
    type: Number,
  },
  // Discounted price of the product
  discountPrice: {
    type: Number,
    required: [true, "Please enter your product price!"],
  },
  // Stock quantity of the product
  stock: {
    type: Number,
    required: [true, "Please enter your product stock!"],
  },
  // URLs of images associated with the product
  images: [{
    type: String,
  }],
  // Reviews for the product
  reviews: [{
    user: {
      type: Object,
    },
    rating: {
      type: Number,
    },
    comment: {
      type: String,
    },
    productId: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    }
  }],
  // Average rating of the product
  ratings: {
    type: Number,
  },
  // ID of the shop associated with the product
  shopId: {
    type: String,
    required: true,
  },
  // Details of the shop associated with the product
  shop: {
    type: Object,
    required: true,
  },
  // Number of items sold out
  sold_out: {
    type: Number,
    default: 0,
  },
  // Timestamp indicating when the product was created
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Product", productSchema);
