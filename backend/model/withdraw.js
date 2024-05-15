const mongoose = require("mongoose");

const withdrawSchema = new mongoose.Schema({
  // The seller who initiated the withdraw request
  seller: {
    type: Object,
    required: true,
  },
  // The amount requested for withdrawal
  amount: {
    type: Number,
    required: true,
  },
  // The status of the withdrawal request (default is "Processing")
  status: {
    type: String,
    default: "Processing",
  },
  // The timestamp indicating when the withdrawal request was created
  createdAt: {
    type: Date,
    default: Date.now(), // Default value is the current date/time
  },
  // The timestamp indicating when the withdrawal request was last updated
  updatedAt: {
    type: Date,
  }
});

module.exports = mongoose.model("Withdraw", withdrawSchema);
