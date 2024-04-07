// require("dotenv").config();

const express = require("express");
const app = express();
const ErrorHandler = require("./utils/ErrorHandler");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
// const fileUpload = require("express-fileupload");


// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    // path: "backend/config/.env",
    path: "config/.env",
    
  });
}

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/", express.static("uploads"));
app.use(bodyParser.urlencoded({extended:true, limit: "50mb"}));

// app.use(fileUpload({ useTempFiles: true }));



// imports routes
const user = require("./controller/user");

app.use("api/v2/user", user);

// its for Errohandling
app.use(ErrorHandler);

module.exports = app;
