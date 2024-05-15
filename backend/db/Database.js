const mongoose = require("mongoose");

// Function to connect to the MongoDB database
const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true, // New URL parser is needed to parse MongoDB connection strings
      useUnifiedTopology: true, // New Server Discover and Monitoring engine is used for monitoring server topology
    })
    .then((data) => {
      console.log(`MongoDB connected with server: ${data.connection.host}`); // Log successful connection
    })
    .catch((error) => {
      console.error("Database connection failed:", error); // Log error if connection fails
      process.exit(1); // Terminate the process with failure
    });
};

module.exports = connectDatabase; // Export the function for use in other parts of the application
