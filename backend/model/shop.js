const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const shopSchema = new mongoose.Schema({
    // Name of the shop
    name: {
        type: String,
        required: [true, "Please enter your shop name!"],
    },
    // Email address of the shop
    email: {
        type: String,
        required: [true, "Please enter your shop email address"],
    },
    // Password of the shop (hashed)
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [6, "Password should be greater than 6 characters"],
        select: false, // Password won't be returned in queries by default
    },
    // Description of the shop
    description: {
        type: String,
    },
    // Address of the shop
    address: {
        type: String,
        required: true,
    },
    // Phone number of the shop
    phoneNumber: {
        type: Number,
        required: true,
    },
    // Role of the shop (default is "Seller")
    role: {
        type: String,
        default: "Seller",
    },
    // Avatar (profile picture) of the shop
    avatar: {
        type: String,
        required: true,
    },
    // Zip code of the shop's location
    zipCode: {
        type: Number,
        required: true,
    },
    // Withdrawal method of the shop
    withdrawMethod: {
        type: Object,
    },
    // Available balance of the shop (default is 0)
    availableBalance: {
        type: Number,
        default: 0,
    },
    // Transactions associated with the shop
    transactions: [{
        amount: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            default: "Processing",
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
        },
    }],
    // Timestamp indicating when the shop was created
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

// Hash password before saving
shopSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Generate JWT token for authentication
shopSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
    });
};

// Compare entered password with hashed password
shopSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Shop", shopSchema);
