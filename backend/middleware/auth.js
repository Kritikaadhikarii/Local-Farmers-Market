const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const Shop = require("../model/shop");

// Middleware to check if the user is authenticated
exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;

    // Check if token exists
    if (!token) {
        return next(new ErrorHandler("Please login to continue", 401));
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Fetch user details using decoded ID
    req.user = await User.findById(decoded.id);

    next();
});

// Middleware to check if the user is a seller
exports.isSeller = catchAsyncErrors(async (req, res, next) => {
    const { seller_token } = req.cookies;

    // Check if seller token exists
    if (!seller_token) {
        return next(new ErrorHandler("Please login to continue", 401));
    }

    // Verify JWT token
    const decoded = jwt.verify(seller_token, process.env.JWT_SECRET_KEY);

    // Fetch seller details using decoded ID
    req.seller = await Shop.findById(decoded.id);

    next();
});

// Middleware to check if the user has admin role
exports.isAdmin = (...roles) => {
    return (req, res, next) => {
        // Check if user role includes admin role
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`${req.user.role} does not have access to this resource!`, 403));
        }
        next();
    };
};
